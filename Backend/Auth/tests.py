from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class AuthenticationTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='testuser@example.com', password='testpassword')
        self.token_url = reverse('token_obtain_pair')
        self.refresh_url = reverse('token_refresh')
        self.verify_url = reverse('token_verify')
        self.user_url = reverse('user-list')
        self.profile_url = reverse('profile-list')

    def test_create_user(self):
        data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'newpassword'
        }
        response = self.client.post(self.user_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(User.objects.get(username='newuser').email, 'newuser@example.com')

    def test_obtain_token(self):
        data = {
            'username': 'testuser',
            'password': 'testpassword'
        }
        response = self.client.post(self.token_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_refresh_token(self):
        refresh = RefreshToken.for_user(self.user)
        data = {
            'refresh': str(refresh)
        }
        response = self.client.post(self.refresh_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

    def test_verify_token(self):
        refresh = RefreshToken.for_user(self.user)
        access = refresh.access_token
        data = {
            'token': str(access)
        }
        response = self.client.post(self.verify_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_access_protected_route(self):
        refresh = RefreshToken.for_user(self.user)
        access = refresh.access_token
        self.client.credentials(HTTP_AUTHORIZATION=f'JWT {access}')
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_credentials(self):
        data = {
            'username': 'wronguser',
            'password': 'wrongpassword'
        }
        response = self.client.post(self.token_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('detail', response.data)
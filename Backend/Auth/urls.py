from django.urls import path, reverse
from rest_framework.routers import SimpleRouter
from .apis import CustomTokenObtainPairView, CustomTokenRefreshView, CustomTokenVerifyView, ProfileViewSet, UserViewSet
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth     import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

router = SimpleRouter()
router.register(r'users', UserViewSet)
router.register(r'profiles', ProfileViewSet, basename='profile')

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', CustomTokenVerifyView.as_view(), name='token_verify'),
] + router.urls
 
 
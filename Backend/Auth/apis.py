from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.contrib.auth import authenticate, get_user_model
from .serializers import ProfileSerializer, UserSerializer
from rest_framework.decorators import action
from .models import Profile

class UserViewSet(ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [AllowAny]
        elif self.action == 'list':
            self.permission_classes = [IsAdminUser]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

class CustomTokenObtainPairView(TokenObtainPairView):
    
    def post(self, request, *args, **kwargs):
        username_or_email = request.data.get('emailOrUsername')
        password = request.data.get('password')
        user = authenticate(request, username=username_or_email, password=password)

        if user is None:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        user_serializer = UserSerializer(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'profile': ProfileSerializer(user.profile).data
        })

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        data = response.data
        user = self.get_user_from_token(response.data['access'])
        user_serializer = UserSerializer(user)
        data['user'] = user_serializer.data
        return Response(data, status=status.HTTP_200_OK)

    def get_user_from_token(self, token):
        decoded_token = AccessToken(token)
        user_id = decoded_token['user_id']
        User = get_user_model()
        return User.objects.get(id=user_id)

class CustomTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        data = response.data
        token = request.data.get('token')
        if token:
            decoded_token = AccessToken(token)
            user_id = decoded_token['user_id']
            User = get_user_model()
            user = User.objects.get(id=user_id)
            user_serializer = UserSerializer(user)
            data['user'] = user_serializer.data
        return Response(data, status=status.HTTP_200_OK)

class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
    def partial_update(self, request, *args, **kwargs):
        
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        
        # Update the profile fields
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        # Update the user fields
        user = instance.user
        user.username = request.data.get('username', user.username)
        user.email = request.data.get('email', user.email)
        user.save()
        
        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
    
    
    
    
    @action(detail=False, methods=['post'], permission_classes=[AllowAny], url_path='get-profile-by-username')
    def get_profile_by_username(self, request):
        username = request.data.get('username')
        if not username:
            return Response({'detail': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            profile = Profile.objects.get(user__username=username)
            serializer = self.get_serializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Profile.DoesNotExist:
            return Response({'detail': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)
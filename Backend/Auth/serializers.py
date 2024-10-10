from rest_framework.serializers import ModelSerializer, IntegerField
from .models import User, Profile

class UserSerializer(ModelSerializer):
    id = IntegerField(read_only=True)

    class Meta:
        model = User
        fields = ("id", 'username', 'email', 'password')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'user', 'first_name', 'last_name', 'profile_image', 'bio', 'email', 'username']
        read_only_fields = ['id', 'user', 'email', 'username']
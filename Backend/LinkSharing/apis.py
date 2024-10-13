from time import sleep
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Link, Profile
from .serializers import LinkSerializer
from rest_framework import status




class LinkViewSet(ModelViewSet):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
    
    @action(detail=False, methods=['post'], url_path='get-links-for-username')
    def get_links_for_username(self, request):
        username = request.data.get('username')
        if not username:
            return Response({'error': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        links = Link.objects.filter(profile__user__username=username)
        serializer = LinkSerializer(links, many=True)
        return Response(serializer.data)  
    
    @action(detail=False, methods=['get'], url_path='get-links-for-me')
    def get_links_for_me(self, request): 
        sleep(5)
        links = Link.objects.filter(profile__user=request.user)
        serializer = LinkSerializer(links, many=True)
        return Response(serializer.data)  
    def partial_update(self, request, *args, **kwargs):
        print(request)
        return super().partial_update(request, *args, **kwargs)
    

    def create(self, request, *args, **kwargs):
        print(request.user.profile.id)
        request.data['profile'] = request.user.profile.id  # Set profile from request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)



    @action(detail=True, methods=['post'], url_path='update-order')
    def fix_order(self, request, pk=None):
        link = self.get_object()
        order = request.data.get('order')
        if order is None:
            return Response({'error': 'Order is required'}, status=status.HTTP_404_NOT_FOUND)
        
        link.order = order
        link.save()
        serializer = LinkSerializer(link)
        return Response(serializer.data, status=status.HTTP_200_OK)
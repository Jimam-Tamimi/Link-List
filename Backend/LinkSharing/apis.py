from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Link, Profile
from .serializers import LinkSerializer





class LinkViewSet(ModelViewSet):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
    @action(detail=False, methods=['post'], url_path='get-links-for-username')
    def get_links_for_username(self, request):
        username = request.data.get('username')
        if not username:
            return Response({'error': 'Username is required'}, status=400)
        
        links = Link.objects.filter(profile__user__username=username)
        serializer = LinkSerializer(links, many=True)
        return Response(serializer.data)  
    
    @action(detail=False, methods=['get'], url_path='get-links-for-me')
    def get_links_for_me(self, request): 
        
        links = Link.objects.filter(profile__user=request.user)
        serializer = LinkSerializer(links, many=True)
        return Response(serializer.data)  
    def partial_update(self, request, *args, **kwargs):
        print(request)
        return super().partial_update(request, *args, **kwargs)
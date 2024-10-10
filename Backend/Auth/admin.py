from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Profile, User

class UserAdminConfig(UserAdmin):
    model = User
    list_display = ('username', 'email', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2'),
        }),
    )
    search_fields = ('username', 'email')
    ordering = ('username',)
    filter_horizontal = ('user_permissions',)

admin.site.register(User, UserAdminConfig)

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'first_name', 'last_name', 'email', 'username')  # Fields to display in list view
    search_fields = ('user__username', 'first_name', 'last_name')  # Enable search by these fields
    list_filter = ('user__is_active', 'user__is_staff')  # Add filters for easy filtering

admin.site.register(Profile, ProfileAdmin)
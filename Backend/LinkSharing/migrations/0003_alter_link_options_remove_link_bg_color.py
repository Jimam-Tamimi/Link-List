# Generated by Django 5.1.2 on 2024-10-11 02:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('LinkSharing', '0002_rename_title_link_platform'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='link',
            options={'ordering': ['-created_at']},
        ),
        migrations.RemoveField(
            model_name='link',
            name='bg_color',
        ),
    ]

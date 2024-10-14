# manage.py

import os
import sys
from django.core.management import execute_from_command_line
from django.core.wsgi import get_wsgi_application

# Set the default settings module for the 'manage' command.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")  # Adjust if your settings module path is different

# Get the WSGI application for the project.
application = get_wsgi_application()

# Define the handler for Vercel to use.
handler = application  # This exposes the WSGI application callable as 'handler'

if __name__ == "__main__":
    execute_from_command_line(sys.argv)  # Run the command line utility

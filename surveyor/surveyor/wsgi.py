import os
from pathlib import Path
from django.core.wsgi import get_wsgi_application
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables
ENVIRONMENT = os.getenv('DJANGO_ENVIRONMENT', 'development')
env_file = BASE_DIR / ('.env' if ENVIRONMENT == 'production' else '.env.development')

# Ensure to load the .env file from the correct path
load_dotenv(dotenv_path=env_file)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'surveyor.settings')

application = get_wsgi_application()

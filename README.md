
# Link-List

Link-List is a web platform where users can sign up, create profiles, and share their information along with various links such as social media or websites.

## Features

- User authentication (Sign up, Login)
- Profile creation with personal information and link management
- Shareable profile links
- Django backend for API and authentication
- Next.js frontend for user interface

## Tech Stack

### Backend (Django)
- **Django** 5.1.2
- **Django REST Framework**
- **Simple JWT** for authentication

### Frontend (Next.js)
- **Next.js** 14
- **React.js** 18
- **Tailwind CSS** for styling
- **Framer Motion** for animations

## Getting Started

### Prerequisites
- **Node.js** v20.17.0
- **npm** v10.8.3
- **Python** (v3.9+)
- **Virtualenv** (recommended)

### Clone the repository
```bash
git clone https://github.com/Jimam-Tamimi/Link-List.git
```

### Backend Setup (Django)

1. Navigate to the backend directory:
   ```bash
   cd Link-List/Backend
   ```

2. (Optional) Create and activate a virtual environment:
   ```bash
   pip install virtualenv
   virtualenv venv
   ```

   - **Windows**: 
     ```bash
     .venvScriptsactivate
     ```
   - **macOS/Linux**: 
     ```bash
     source venv/bin/activate
     ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Run the development server:
   ```bash
   python manage.py runserver
   ```

   The backend will be accessible at [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

### Frontend Setup (Next.js)

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd Link-List/Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   The frontend will be accessible at [http://localhost:3000/](http://localhost:3000/).

## API Documentation

The Link-List project provides an API with detailed documentation available in the following formats:

- **OpenAPI Schema**: The full OpenAPI specification is available at:
  - [http://127.0.0.1:8000/api/schema/](http://127.0.0.1:8000/api/schema/)

- **Swagger UI**: For interactive API exploration using Swagger:
  - [http://127.0.0.1:8000/api/swagger/](http://127.0.0.1:8000/api/swagger/)

- **ReDoc UI**: For an alternative API documentation viewer with ReDoc:
  - [http://127.0.0.1:8000/api/redoc/](http://127.0.0.1:8000/api/redoc/)

These tools provide an easy way to visualize the API endpoints, request/response formats, and interact with the backend API.

## Contributing

Feel free to submit issues or pull requests to improve the project. Contributions are welcome!

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.contrib import messages
from django.core.exceptions import ValidationError
from django.core.mail import EmailMultiAlternatives
from django.utils.html import format_html
from .forms import UserRegisterForm
from .models import Profile
from datetime import datetime
from django.core.mail import send_mail

import logging

logger = logging.getLogger(__name__)
User = settings.AUTH_USER_MODEL

# Create your views here.
def index(request):

    return render(request, 'index.html')

def auth(request):

    logger.info("Request received: %s", request.POST)
    form = UserRegisterForm() 
    
    if request.method == "POST":
        # Handle Login
        if 'login' in request.POST:
            email = request.POST['email']
            password = request.POST['password']
            user = authenticate(request, email=email, password=password)
            if user:
                login(request, user)
                messages.success(request, 'Logged in successfully.')
                return redirect('dash') 
            else:
                messages.error(request, 'Invalid email or password.')
        
        # Handle Registration
        elif 'register' in request.POST:
            logger.info("Registration request detected.")

            form = UserRegisterForm(request.POST)
            if form.is_valid():
                user = form.save()
                
                send_welcome_email(user)
                
                messages.success(request, 'Account created successfully. Please log in.')
                return redirect('auth')
            else:
                logger.error("Registration form errors: %s", form.errors)
                messages.error(request, 'Error creating account. Please correct the errors below.')
    else:
        form = UserRegisterForm()
    return render(request, 'register_login.html', {'form': form})

@login_required(login_url='/auth/')
def dash(request):
    current_hour = datetime.now().hour
    if 5 <= current_hour < 12:
        greeting = "Morning"
    elif 12 <= current_hour < 17:
        greeting = "Afternoon"
    elif 17 <= current_hour < 21:
        greeting = "Evening"
    else:
        greeting = "Night"

    return render(request, 'dashboard.html', {
        'user': request.user,  # Pass the user object
        'greeting': greeting,  # Pass the greeting
    })
     

def send_welcome_email(user):
    subject = "Welcome to Event Booking!"
    from_email = settings.EMAIL_HOST_USER
    to_email = [user.email]

    # Plain text message
    text_message = f"""
    Hi {user.first_name},

    Your account has been successfully created!
    Login to your account to explore upcoming events.

    Cheers,
    The Event Booking Team
    """

    # HTML message
    html_message = generate_email_content(user)

    # Create and send email with both plain text and HTML
    email = EmailMultiAlternatives(subject, text_message, from_email, to_email)
    email.attach_alternative(html_message, "text/html")
    email.send()

def generate_email_content(user):
    return format_html("""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {{
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f9;
            }}
            .email-container {{
                max-width: 600px;
                margin: 20px auto;
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                border: 1px solid #eaeaea;
            }}
            .header {{
                text-align: center;
                background-color: #007BFF;
                color: white;
                padding: 15px;
                border-radius: 8px 8px 0 0;
            }}
            .header h1 {{
                margin: 0;
                font-size: 24px;
            }}
            .content {{
                padding: 20px;
                line-height: 1.6;
                color: #333;
            }}
            .content p {{
                margin: 0 0 15px;
            }}
            .content a {{
                color: #007BFF;
                text-decoration: none;
            }}
            .footer {{
                text-align: center;
                font-size: 12px;
                color: #999;
                margin-top: 20px;
            }}
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>Welcome to Event Booking!</h1>
            </div>
            <div class="content">
                <p>Hi {first_name},</p>
                <p>Welcome to Event Booking! Your account has been successfully created. We’re excited to have you on board.</p>
                <p>To get started, log in to your account and explore our upcoming events.</p>
                <p>
                    <a href="http://127.0.0.1:8000/auth" style="padding: 10px 20px; background-color: #007BFF; color: white; border-radius: 5px; display: inline-block;">
                        Log In to Your Account
                    </a>
                </p>
                <p>If you have any questions, feel free to contact us.</p>
                <p>Cheers,<br>The Event Booking Team</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Event Booking. All Rights Reserved.</p>
            </div>
        </div>
    </body>
    </html>
    """, first_name=user.first_name)



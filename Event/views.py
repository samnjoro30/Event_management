from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib import messages
from django.core.exceptions import ValidationError
# Create your views here.
def index(request):

    return render(request, 'index.html')

def auth(request):
    if request.method == "POST":
        # Handle Login
        if 'login' in request.POST:
            email = request.POST['email']
            password = request.POST['password']
            user = authenticate(request, username=email, password=password)
            if user:
                login(request, user)
                messages.success(request, 'Logged in successfully.')
                return redirect('dashboard')  # Replace with your dashboard page
            else:
                messages.error(request, 'Invalid email or password.')
        
        # Handle Registration
        elif 'register' in request.POST:
            first_name = request.POST['first_name']
            last_name = request.POST['last_name']
            dob = request.POST['dob']
            email = request.POST['email']
            password1 = request.POST['password1']
            password2 = request.POST['password2']

            # Validation
            if password1 != password2:
                messages.error(request, "Passwords do not match.")
                return redirect('auth')

            if User.objects.filter(username=email).exists():
                messages.error(request, "Email is already registered.")
                return redirect('auth')

            # Create user
            try:
                user = User.objects.create_user(
                    username=email, email=email, password=password1,
                    first_name=first_name, last_name=last_name
                )
                user.save()
                messages.success(request, 'Account created successfully. Please log in.')
                return redirect('auth')
            except ValidationError as e:
                messages.error(request, f"Error: {e.message}")
                return redirect('auth')
    return render(request, 'register_login.html')

def dash(request):
    return render(request, 'dashboard.html')
from django import forms
from django.conf import settings
from django.contrib.auth.forms import UserCreationForm
from .models import Profile
from datetime import date
from django.core.exceptions import ValidationError
from .models import CustomUser
# Make sure to resolve the User model correctly
#mod = settings.AUTH_USER_MODEL

class UserRegisterForm(UserCreationForm):
    email = forms.EmailField(required=True, label="Email")  # Ensure email is mandatory
    dob = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}), required=True, label="Date of Birth")

    class Meta:
        model = CustomUser # This will resolve to the correct model (CustomUser or User)
        fields = [ 'email', 'password1', 'password2', 'first_name', 'last_name', 'dob']

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if CustomUser.objects.filter(email=email).exists():
            raise forms.ValidationError("This email is already registered.")
        return email
        
    def save(self, commit=True):
        # Save User and Profile data
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
           
        return user
        
    def clean_dob(self):
        dob = self.cleaned_data['dob']
        today = date.today()
        age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
        if age < 18:
            raise ValidationError("You must be at least 18 years old to register.")
        return dob


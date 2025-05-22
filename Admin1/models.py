from django.db import models
from django.utils import timezone
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
from django.db import models
class Event(models.Model):
    CATEGORY_CHOICES = [
        ('music', 'Music'),
        ('sports', 'Sports'),
        ('technology', 'Technology'),
        ('art', 'Art'),
        ('education', 'Education'),
        ('others', 'Others'),
    ]


    name = models.CharField(max_length=255)
    image_url = models.URLField(max_length=500)  # Stores the Cloudinary URL
    description = models.TextField()
    tickets_available = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=255)
    date = models.DateField(default=timezone.now)  # New date field
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='others')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
class Booking(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    tickets_booked = models.PositiveIntegerField()
    booking_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking by {self.user.username} for {self.event.name}"




from django.shortcuts import render,  redirect
from django.contrib import messages
from django.db.models import Sum
from .models import Event, Booking
from django.db.models import F
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm
import json
import csv
import cloudinary
import cloudinary.uploader
from decouple import config

import logging

logger = logging.getLogger(__name__)

# Create your views here.
cloudinary.config(
    cloud_name=config('CLOUD_NAME'), 
    api_key=config('CLOUD_API'),        
    api_secret=config('API_SECRET')  
)
def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('management')  # Redirect to dashboard after successful login
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

# Logout View
def logout_view(request):
    logout(request)
    return redirect('login') 
@login_required
def management(request):
    
    category_filter = request.GET.get("category", "").strip()
    events = Event.objects.all()
    search_query = request.GET.get("q", "").strip()
   
    if search_query:
        events = events.filter(name__icontains=search_query)

    if category_filter:
        events = events.filter(category=category_filter)


    categories = ['music', 'sports', 'technology', 'art', 'education', 'others']
    events_by_category = {category: events.filter(category=category) for category in categories}

    bookings = Booking.objects.select_related("event", "user").order_by("-booking_date")

    # View Stats Logic
    stats = {
        "total_events": Event.objects.count(),
        "total_tickets_sold": Booking.objects.aggregate(Sum('tickets_booked'))['tickets_booked__sum'] or 0,
        "total_revenue": Booking.objects.annotate(revenue=F('tickets_booked') * F('event__price')).aggregate(Sum('revenue'))['revenue__sum'] or 0,
    }

    if request.method == "POST":

        try:
            # Get form data
            name = request.POST["name"]
            description = request.POST["description"]
            tickets_available = int(request.POST["tickets_available"])
            price = float(request.POST["price"])
            location = request.POST["location"]
            date = request.POST["date"]  # Get the date field
            category = request.POST["category"]
            image_file = request.FILES["image"]

            # Upload image to Cloudinary
            upload_result = cloudinary.uploader.upload(image_file)
            image_url = upload_result["secure_url"]

            # Save event in the database
            Event.objects.create(
                name=name,
                image_url=image_url,
                description=description,
                tickets_available=tickets_available,
                price=price,
                location=location,
                date=date,
                category=category,
            )
            messages.success(request, "Event added successfully!")

            return redirect("management")  # Redirect to an event list page (create this view if needed)

        except Exception as e:
            # Handle errors (e.g., Cloudinary upload issues)
            return render(request, "admin.html", {"error": str(e)})


    return render(request, 'admin.html', {
        
        "search_query": search_query,
        "selected_category": category_filter,
        "events_by_category": events_by_category,
        "selected_category": category_filter,
        "bookings": bookings,
        "stats": stats,
        })

from django.shortcuts import get_object_or_404

def edit_event(request, event_id):
    event = get_object_or_404(Event, id=event_id)

    if request.method == "POST":
        try:
            # Update event details from form
            event.name = request.POST["name"]
            event.description = request.POST["description"]
            event.tickets_available = int(request.POST["tickets_available"])
            event.price = float(request.POST["price"])
            event.location = request.POST["location"]
            date = request.POST["date"]  # Get the date field
            category = request.POST["category"]

            # Check if an image was uploaded
            if "image" in request.FILES:
                image_file = request.FILES["image"]
                upload_result = cloudinary.uploader.upload(image_file)
                event.image_url = upload_result["secure_url"]

            event.save()
            messages.success(request, "Event updated successfully!")
            return redirect("management")  # Redirect back to admin dashboard
        except Exception as e:
            messages.error(request, f"Error updating event: {str(e)}")
    
    return render(request, "edit.html", {"event": event})

def delete_event(request, event_id):
    print(f"Attempting to delete event with ID: {event_id}")
    event = get_object_or_404(Event, id=event_id)

    if request.method == "POST":
        event.delete()
        messages.success(request, "Event deleted successfully!")
        return redirect("management")  # Redirect back to admin dashboard
    
    return render(request, "delete.html", {"event": event})

@login_required
def book_event(request, event_id):
    if request.method == "POST":
        logger.debug(request.body)
        logger.debug(f"Request headers: {request.headers}")
        logger.debug(f"Request body: {request.body}")

        try:
            data = json.loads(request.body)
            logger.debug(f"Request body: {request.body}")
            logger.debug(f"Parsed JSON: {json.loads(request.body)}")
            tickets_requested = int(data.get("tickets", 0))
            payment_method = data.get("payment_method")

            event = get_object_or_404(Event, id=event_id)
            
            if Booking.objects.filter(user=request.user, event=event).exists():
                return JsonResponse({"error": "You have already booked this event."}, status=400)

            if tickets_requested > event.tickets_available:
                logger.warning("Not enough tickets available")
                return JsonResponse({"error": "Not enough tickets available"}, status=400)

            if payment_method not in ["mpesa", "event_day"]:
                return JsonResponse({"error": "Invalid payment method"}, status=400)


            # Create a new booking
            booking = Booking.objects.create(
                user=request.user,
                event=event,
                tickets_booked=tickets_requested,
                payment=  payment_method
            )
            logger.debug(f"Booking created: {booking.id}")
            # Update tickets available
            event.tickets_available -= tickets_requested
            event.save()
            logger.debug(f"Tickets updated. Remaining: {event.tickets_available}")
            return JsonResponse({"message": "Booking successful"}, status=200)

        except json.JSONDecodeError as e:
            logger.error(f"JSON Decode Error: {str(e)}")
            return JsonResponse({"error": "Invalid JSON payload"}, status=400)


        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)

@staff_member_required
def view_bookings(request):
    bookings = Booking.objects.select_related("event", "user").order_by("-booking_date")
    return render(request, "admin.html", {"bookings": bookings})

@login_required
def get_user_bookings(request):
    try:
        # Fetch bookings related to the logged-in user
        bookings = Booking.objects.filter(user=request.user).select_related("event")
        
        booking_data = []
        for booking in bookings:
            booking_data.append({
                "event_name": booking.event.name,
                "event_date": booking.event.date,
                "event_location": booking.event.location,
                "tickets_booked": booking.tickets_booked,
                "event_image_url": booking.event.image_url,  # Add if you have this field
                "Payment method" : booking.payment,
            })
        
        return JsonResponse({"bookings": booking_data}, status=200)
    
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)


def export_bookings_csv(request):
    bookings = Booking.objects.select_related("event", "user").order_by("-booking_date")

    # Create the HTTP response with CSV headers
    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = 'attachment; filename="bookings.csv"'

    # Create CSV writer
    writer = csv.writer(response)
    writer.writerow(["Event", "User", "Tickets Booked", "Booking Date"])

    for booking in bookings:
        writer.writerow([
            booking.event.name,
            booking.user.username,
            booking.tickets_booked,
            booking.booking_date,
        ])

    return response


from django.http import JsonResponse
from django.db.models import Sum, F

@login_required
def get_stats(request):
    """
    API endpoint to fetch statistics for real-time graphs.
    """
    stats = {
        "revenue": list(Booking.objects.annotate(revenue=F('tickets_booked') * F('event__price'))
                        .values_list('revenue', flat=True)),  # Replace with aggregated data if needed
        "revenue_labels": list(Event.objects.values_list('date', flat=True)),  # Replace with months or other labels
        "bookings": list(Booking.objects.values_list('tickets_booked', flat=True)),  # Example bookings data
        "booking_labels": list(Event.objects.values_list('name', flat=True)),  # Event names for labels
       
    }
    return JsonResponse(stats)

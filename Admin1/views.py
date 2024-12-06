from django.shortcuts import render,  redirect
from django.contrib import messages
from django.db.models import Sum
from .models import Event,  Booking
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required

import cloudinary
import cloudinary.uploader
# Create your views here.
cloudinary.config(
    cloud_name="denau3vzn", 
    api_key="518891139551556",        
    api_secret="kD7QghpndGh5eVBirF2HQiyw9_0"  
)
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
        try:
            event = get_object_or_404(Event, id=event_id)
            tickets_requested = int(request.POST.get("tickets"))

            if tickets_requested > event.tickets_available:
                return JsonResponse({"error": "Not enough tickets available"}, status=400)

            # Create a new booking
            Booking.objects.create(
                user=request.user,
                event=event,
                tickets_booked=tickets_requested
            )

            # Update tickets available
            event.tickets_available -= tickets_requested
            event.save()

            return JsonResponse({"message": "Booking successful"}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)

@staff_member_required
def view_bookings(request):
    bookings = Booking.objects.select_related("event", "user").order_by("-booking_date")
    return render(request, "admin.html", {"bookings": bookings})
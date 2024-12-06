from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Event # Booking

# API to get all events
class EventListAPIView(APIView):
    def get(self, request):
        events = Event.objects.all()
        event_data = [
            {
                "id": event.id,
                "name": event.name,
                "description": event.description,
                "tickets_available": event.tickets_available,
                "price": float(event.price),
                "location": event.location,
                "image_url": event.image_url,
                "created_at": event.created_at,
            }
            for event in events
        ]
        return Response(event_data, status=status.HTTP_200_OK)


# API to get bookings for a specific event
class BookingListAPIView(APIView):
    def get(self, request, event_id):
        bookings = Booking.objects.filter(event_id=event_id)
        booking_data = [
            {
                "id": booking.id,
                "user": booking.user.username,
                "tickets_booked": booking.tickets_booked,
                "total_price": float(booking.total_price),
                "booking_date": booking.booking_date,
            }
            for booking in bookings
        ]
        return Response(booking_data, status=status.HTTP_200_OK)

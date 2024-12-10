from django.urls import path
from .  import views
from . import api_view

urlpatterns = [
    path('management/', views.management, name="management"),
    path("api/events/", api_view.EventListAPIView.as_view(), name="api_events"),
    # path("api/bookings/<int:event_id>/", api_view.BookingListAPIView.as_view(), name="api_bookings"),
    path("edit-event/<int:event_id>/", views.edit_event, name="edit_event"),
    path("delete-event/<int:event_id>/", views.delete_event, name="delete_event"),
    path("book-event/<int:event_id>/", views.book_event, name="book_event"),
    path("admin/bookings/", views.view_bookings, name="view_bookings"),
    path('my-bookings/', views.get_user_bookings, name='my_bookings'),
    path('admin/bookings/export/', views.export_bookings_csv, name='export_bookings_csv'),
    path('login/', views.login_view, name="login"),
    path('logout/', views.logout, name="logout"),
    path('stats/', views.get_stats, name="stats")
]
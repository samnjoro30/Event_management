from django.apps import AppConfig


class EventConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "Event"

    def ready(self):
        from .pinger import start_pinger
        start_pinger()

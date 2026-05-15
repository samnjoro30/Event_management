# myapp/pinger.py

import requests
import time
import threading

RENDER_URL = "https://event-management-chry.onrender.com/"

def ping_render():
    while True:
        try:
            response = requests.get(RENDER_URL, timeout=30)
            print(f"Pinged Render: {response.status_code}")
        except Exception as e:
            print(f"Ping failed: {e}")

        # wait 5 minutes
        time.sleep(600)


def start_pinger():
    thread = threading.Thread(target=ping_render)
    thread.daemon = True
    thread.start()
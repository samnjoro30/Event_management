# firebase.py
import firebase_admin
from firebase_admin import credentials, storage, db

# Path to your Firebase Admin SDK JSON file
FIREBASE_CREDENTIALS = "./creditials.json"

# Initialize Firebase app
if not firebase_admin._apps:  # Avoid reinitialization
    cred = credentials.Certificate(FIREBASE_CREDENTIALS)
    firebase_admin.initialize_app(cred, {
        "storageBucket": "event-management-af2e3.appspot.com",  # Replace with your Firebase bucket
        "databaseURL": "https://event-management-af2e3-default-rtdb.firebaseio.com"  # For Realtime Database
    })

# Firebase storage bucket
bucket = storage.bucket()

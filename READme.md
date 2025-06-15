# Event management System
![Django](https://img.shields.io/badge/Django-3.2-green.svg)
![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)

***
## 🧭 Table of Contents
1. [About The Project](#about-the-project)  
2. [Features](#features)  
3. [Built With](#built-with)  
4. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Installation](#installation)  
5. [Usage](#usage)  
6. [Screenshots / Demo](#screenshots--demo)  
7. [Contributing](#contributing)  
8. [License](#license)  
9. [Contact](#contact)  
10. [Acknowledgements](#acknowledgements)

---

## 📝 About The Project
A full-stack Event Management System enabling:

- Event creation, listing, and categorization  
- User registration and authentication  
- Admin dashboard for managing events and participants  
- (Optionally) QR code-based check-in, payment integration, notifications, etc.

Tailored to simplify event organization and streamline attendee management.

---


## ```Features```

- **User Authentication**  
  `Register, login, and profile management`
- **Event Management**  
  `Create/update/delete events with rich details`
- **Automated Emailing**
  `an email verification once you register`
- **Ticket System**  
  `Multiple ticket types with pricing tiers`
- **Search & Filters**  
  `Find events by date/location/category`
- **Admin panel**
  `login, create, manage, view ticket booked for the  events`

***
## 🛠️ Built With
- **Back-end**: Django framework 
- **Front-end**: HTML5, CSS3, javascript
- **Database**: MySQL / SQLite  
- **Optional**: JavaScript, AJAX
---

# Getting Started

### Requirements
 
 - **Python 3.7+**
 - **Django 3.2+**
 - **MySQL**
 - **XAMPP Server**


### ```Installation```

1. **create a new folder and navigate to the folder**
```bash
  cd to-your-folder
```
2. **clone the repository and navigate**
```bash
git clone https://github.com/samnjoro30/Event_management.git
cd Event_management
```
3. **Install dependencies**
```bash
pip install -r requirements.txt
```
4. **Set up enviroment variables**
```bash
touch .env
```
5. **Run migrations**
```bash
python manage.py migrate
```

- Now start your XAMPP serve to connect MySQL

6. **Run this command to run development server**
```bash
python manage.py runserver
```

## 🎯 Usage
1. Visit `http://localhost:8000/`  
2. Create an account  
3. Browse existing events or create a new one (admin only)  
4. Book for events (users)  
5. Admins can view participants and manage events

## 📸 Screenshots / Demo
<div align="center">
  <img src="screenshots/Event1.png" width="45%" alt="Screenshot 1" title="welcome layout">
  <img src="screenshots/Event2.png" width="45%" alt="Screenshot 2" title="Page">
  <br>
  <img src="screenshots/Event3.png" width="45%" alt="Screenshot 3" title="client login">
  <img src="screenshots/Event4.png" width="45%" alt="Screenshot 4" title="Event welcome">
  <br>
  <img src="screenshots/Event5.png" width="45%" alt="Screenshot 5" title="Events">
  <img src="screenshots/Event6.png" width="45%" alt="Screenshot 5" title="Admin add event">
  <br>
  <img src="screenshots/Event7.png" width="45%" alt="Screenshot 5" title="Admon view">
  <img src="screenshots/Event8.png" width="45%" alt="Screenshot 5" title="Admin booking">
  <img src="screenshots/Event9.png" width="90%" alt="Screenshot 5" title="Admin stat page">
</div>
# Contact
For any question or Support, please Contact:
 - Samuel Njoroge
 - **samnjorokibandi@gmail.com**
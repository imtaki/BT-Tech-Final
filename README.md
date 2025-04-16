# Backend Technologies Course – Final Project 2025

## 📚 Project Theme  
**CMS Archive for Animal Science Days**

## 👥 Team Members  
- Dominik Takáč  
- Filip Prešnajder  
- Martin Rosík

## 🛠 Tech Stack  
- **Frontend:** TBD  
- **Backend:** Laravel (PHP)  
- **Database:** MySQL

## 📝 Description  
The project is a content management system designed to archive and manage materials, records, and events related to Animal Science Days. The backend is built using Laravel and stores data in a MySQL database. The frontend stack will be finalized during development.

## 📁 Project Structure

```plaintext
be-final/
├── frontend/                  # Frontend application (Framework TBD)
│   ├── public/                # Static assets and entry HTML
│   ├── src/                   # Source code
│   │   ├── assets/            # Images, fonts, etc.
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── utils/             # Utility functions
│   │   └── App.js             # Root component
│   ├── package.json           # Dependencies and scripts
│   └── .env                   # Environment variables
│
├── backend/                   # Laravel backend application
│   ├── app/                   # Application code
│   │   ├── Http/              # HTTP layer
│   │   │   ├── Controllers/   # Request handlers
│   │   │   └── Middleware/    # HTTP middleware
│   │   └── Models/            # Eloquent models
│   ├── config/                # Configuration files
│   ├── database/              # Database
│   │   ├── migrations/        # Database migrations
│   │   └── seeders/           # Database seeders
│   ├── public/                # Publicly accessible files
│   ├── routes/                # Routes definition
│   │   └── api.php            # API routes
│   ├── storage/               # App storage
│   ├── tests/                 # Automated tests
│   ├── .env                   # Environment config
│   └── composer.json          # PHP dependencies
│
├── .gitignore                 # Git ignore file
├── README.md                  # Project documentation
```

# 📸 Images library Application with JWT Authentication

# 🚀 Live Demo

👉 View on Vercel: https://photos-frontend-five.vercel.app
👉 Git repository: https://github.com/Sandy8172/photos_frontend

## --------------------------------------------------------------------

## ✨ Features

# 🔐 Authentication

    cookies-based cookies Login & Logout for secure session handlin
    User Registration with username + password
    Protected Routes to prevent unauthorized access
    Session Persistence across browser tabs and refresh

# ⏳ Idle Session Handling

    Token Expiration Handling
    Auto Logout after 2 minutes of inactivity
    Notification informing users when their session expires
    Detects user actions like mouse movement, clicks, typing, scrolling, and touch

# 🖼️ Image Library

    Live Search to filter images by title instantly
    API Integration with custom hooks to make it clean and reusable
    Pagination for heavy data
    Image Detail View for expanded info
    Fully Responsive Layout optimized for all screen sizes

# 🎨 User Experience

    Modern, clean UI using Tailwind CSS + shadcn/ui
    Smooth loading states for a polished feel
    Clear error messages and robust validation
    Accessibility-friendly

## --------------------------------------------------------------------------

## 🛠️ Tech Stack

    Framework: Next.js 16 (App Router), (React 19)
    Styling: Tailwind CSS, shadcn/ui
    Authentication: JWT (jsonwebtoken) + Cookies

## ---------------------------------------------------------------------------

## ⚙️ Installation

# make sure to install Node.js v18+ and npm in your system to run the project

# From Zip file

    -- Unzip the file
    *now in cmd*
    -- cd frontend_photos
    -- npm install
    -- npm run dev

# From Git repository

    -- Open to cmd
    -- git clone https://github.com/Sandy8172/photos_frontend
    -- cd frontend_photos
    -- npm install
    -- npm run dev

## app will open in http://localhost:3000/

## 🧪 Demo Credentials

    Username = admin
    Password = Admin@123456

├── app/ # Next.js App Router pages
│ ├── (protected)/ # protected routes
│ ├── context/ # AuthProvider logic
│ ├── hooks/ # custom hooks
│ ├── sign-in/ # log in page
│ ├── sign-up/ # Registration page
│ ├── utils.jsx # utilities functions
│ └── layout.tsx # Root layout)
├── components/ # Reusable UI components
│ └── useIdleTimeout.ts # Idle activity detection

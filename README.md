# CipherKey

CipherKey is a secure and user-friendly password manager built with React for the frontend and Node.js with Express for the backend. It allows users to store, manage, and retrieve their passwords securely.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Contributing](#contributing)


## Features

- User authentication with signup and login functionality
- Secure password storage using MongoDB
- Password management (create, update, delete)
- Responsive design with Tailwind CSS
- Toast notifications for user feedback
- Password strength validation and username availability check

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

### Backend Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/cipherkey.git
    cd cipherkey/backend
    ```

2. Install backend dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:

    ```env
    NODE_ENV=development
    MONGO_URL=your_mongodb_connection_string
    SESSION_SECRET=your_session_secret
    ```

4. Start the backend server:

    ```sh
    npm run dev
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:

    ```sh
    cd ../frontend
    ```

2. Install frontend dependencies:

    ```sh
    npm install
    ```

3. Start the frontend development server:

    ```sh
    npm run dev
    ```

## Usage

1. Open your browser and navigate to `http://localhost:5173`.
2. Sign up for a new account or log in with an existing account.
3. Use the password manager to store, update, and delete your passwords.

## Technologies Used

- **Frontend:**
  - React
  - Vite
  - Tailwind CSS
  - Axios
  - React Router
  - Framer Motion
  - React Toastify

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - Passport.js
  - Connect-Mongo
  - dotenv
  - bcryptjs

## Project Structure
CipherKey/
│── backend/
│   │── models/
│   │   │── passwords.js
│   │── users.js
│   │── index.js
│── .env
│── frontend/
│   │── public/
│   │── src/
│   │   │── assets/
│   │   │── components/
│   │   │   │── AuthContext.jsx
│   │   │── App.css
│   │   │── App.jsx
│   │   │── index.css
│   │   │── main.jsx
│── .gitignore
│── eslint.config.js
│── index.html
│── package.json
│── README.md
│── vite.config.js


## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.


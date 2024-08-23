# Learning Management System (LMS)

## Overview

The Learning Management System (LMS) is a web-based platform designed to enhance the educational experience for both instructors and students. It provides a seamless way to manage courses, track progress, and facilitate communication and collaboration in an educational environment.

## Features

- **User Authentication**: Secure login and registration for both students and instructors.
- **Course Management**: Create, edit, and delete courses with ease.
- **Content Delivery**: Upload and manage course materials like videos.
- **Discussion Forum**: Implemented a real-time discussion forum for students to discuss amongst themselves.
- **Notification System**: Automated email notifications for important updates and deadlines.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, React.js
- **Backend**: Node.js, Express.js, Socket.IO, NodeMailer
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**

2. **Create .env file in the server directory and set the following variables**:
   ```bash
   ACCESS_TOKEN_SECRET     // create a random secret token using crypto on node terminal
   REFRESH_TOKEN_SECRET    // create a random secret token using crypto on node terminal
   PORT                    // use a port number i.e not in use like 3000
   URI                     // link to connect to your database local mongodb uri or ATLAS
   HOST                    // set host of ur email provider for automated email like smtp.gmail.com
   USERNAME                // Your Gmail
   PASS                    // Password to your GMail Account
   ```
3. **Install dependencies in both server and client**:
   ```bash
   npm install
   ```
4. **Go to Server directory and run this command**:
   ```bash
   node index.js
   ```
5. **Go to Client directory and run this command**:
   ```bash
   npm run dev
   ```
6. **Copy and paste the link from terminal in the browser**

# 🔗 Connect Karo

**Connect Karo** is a full-stack social media application built with **React**, **Node.js**, **Express.js**, and **MongoDB**. It enables users to create, connect, and share with features such as profile management, posts with images, interactive comments, likes, and much more.

---

## 🔧 Features

### 🔐 User Management
- 🔑 **Create Accounts** with profile pictures.
- ➔ **Follow/Unfollow** other users.
- 🔑 **Update Passwords** with secure authentication.
- ❌ **Delete Accounts** when needed.
- 📧 **Forgot Password Functionality** using **SMTP mailer** for secure password recovery.

### 🌍 Posting System
- 🖼 **Create Posts with Images** using **Cloudinary** for efficient image storage.
- 💬 Allow users to **comment** and ⭐ **like posts**.
- 🎮 **Full moderation capabilities** for post creators to manage comments and posts.

### 🔍 Search Functionality
- ✉ Efficient search to find **users registered in the database**.

### 🔄 Dashboard
- 🔄 **Dynamic user dashboard** built with **React** and **Redux** for seamless navigation and state management.

### 🛡️ Security
- ✔ **Authentication and Authorization** using **JWT tokens** and **cookie-parser** for secure user sessions.
- 🔒 **CORS policy** enabled to safeguard API communications.

---

## 📼 Tech Stack

### Frontend
- 🔄 **React.js** for building an intuitive and responsive user interface.
- 🌈 **Redux** for efficient state management.
- 🔳 **CSS/SCSS** for styling.

### Backend
- ♻ **Node.js** and **Express.js** for creating RESTful APIs.
- 🏛 **MongoDB** for scalable database management.
- ⚡ **JWT Tokens** for secure authentication.
- 🌈 **Cookie-parser** for session management.
- 📧 **SMTP Mailer** for email services.

### Other Services
- 🖼 **Cloudinary** for image storage and management.
- ✔ **CORS** for handling cross-origin requests.

---

## 🔧 Installation and Setup

### Prerequisites
- 🌐 **Node.js** and **npm** installed on your system.
- 🏛 **MongoDB** instance running locally or on the cloud.

### Steps
1. 🔧 Clone the repository:
   ```bash
   git clone https://github.com/your-username/connect-karo.git
   ```
2. 🔧 Navigate to the project directory:
   ```bash
   cd connect-karo
   ```
3. ⚙️ Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```
4. 🔑 Set up environment variables in a `.env` file for the backend:
   ```env
   PORT=5000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   SMTP_HOST=your_smtp_host
   SMTP_PORT=your_smtp_port
   SMTP_USER=your_email
   SMTP_PASS=your_email_password
   ```
5. ⚡ Start the backend server:
   ```bash
   npm start
   ```
6. ⚙️ Install dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
   ```
7. 🌄 Start the React development server:
   ```bash
   npm start
   ```

---

## 🚀 Usage
- 🆗 Sign up and create your account.
- ➔ Follow and unfollow other users to build your network.
- 🖼 Create posts with images and interact with others via likes and comments.
- 🔍 Search for users and explore their profiles.


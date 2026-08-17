# Personal Vault — Diary & Password Manager

A cute, modern, private digital diary and secure password vault web application built with Next.js, Express.js, and MongoDB.

---

## Features

- **Login / Register** — JWT authentication with bcrypt password hashing
- **Dashboard** — Welcome page with password, note, and diary counts
- **Password Manager** — Store, edit, delete, show/hide, copy, and track password history (AES-256 encrypted)
- **Personal Notes** — Create, edit, delete, pin, and search notes
- **Private Diary** — Write diary entries with mood selection and search
- **Settings** — View account info and app details
- **Responsive Design** — Works on desktop, laptop, tablet, and mobile
- **Glassmorphism UI** — Soft pink + blue pastel theme with modern glass cards

---

## Technology Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Frontend   | Next.js, React, TypeScript, CSS |
| Backend    | Node.js, Express.js         |
| Database   | MongoDB, Mongoose           |
| Auth       | JWT, bcryptjs               |
| Encryption | AES-256-CBC (Node crypto)   |

---

## Project Structure

```
personal_diary/
│
├── package.json                (root — runs both frontend and backend)
│
├── backend/
│   ├── server.js               (Express server on port 5000)
│   ├── .env                    (MongoDB URI, JWT secret, encryption key)
│   ├── package.json
│   ├── models/
│   │   ├── User.js             (email, username, hashed password)
│   │   ├── Password.js         (encrypted vault passwords + history)
│   │   ├── Note.js             (title, content, pin)
│   │   └── Diary.js            (date, title, mood, content)
│   ├── middleware/
│   │   ├── auth.js             (JWT authentication middleware)
│   │   └── encryption.js       (AES-256-CBC encrypt/decrypt)
│   ├── controllers/
│   │   ├── authController.js   (register, login, logout, getMe)
│   │   ├── passwordController.js (CRUD + history)
│   │   ├── noteController.js   (CRUD + pin)
│   │   └── diaryController.js  (CRUD)
│   └── routes/
│       ├── auth.js             (POST /login, /register, /logout)
│       ├── passwords.js        (CRUD /api/passwords)
│       ├── notes.js            (CRUD /api/notes)
│       └── diary.js            (CRUD /api/diary)
│
└── frontend/
    ├── package.json
    ├── tsconfig.json
    ├── next.config.js
    ├── styles/
    │   └── globals.css         (global styles, glassmorphism theme)
    ├── components/
    │   ├── AuthContext.tsx      (auth state management)
    │   ├── Navigation.tsx      (top nav + mobile bottom nav)
    │   └── Navigation.module.css
    └── app/
        ├── layout.tsx          (root layout with AuthProvider)
        ├── globals.css         (imports global styles)
        ├── page.tsx            (redirects to login or dashboard)
        ├── login/
        │   ├── page.tsx        (login + register form)
        │   └── page.module.css
        ├── dashboard/
        │   ├── page.tsx        (welcome + stat cards)
        │   └── page.module.css
        ├── passwords/
        │   ├── page.tsx        (password CRUD + search)
        │   └── page.module.css
        ├── notes/
        │   ├── page.tsx        (notes CRUD + pin + search)
        │   └── page.module.css
        ├── diary/
        │   ├── page.tsx        (diary CRUD + mood + search)
        │   └── page.module.css
        └── settings/
            ├── page.tsx        (account info + about)
            └── page.module.css
```

---

## Prerequisites

Before running this project, make sure you have installed:

1. **Node.js** (v18 or higher) — Download from [https://nodejs.org](https://nodejs.org)
2. **MongoDB** — Either local or cloud (MongoDB Atlas)

Check if Node.js is installed:
```bash
node --version
```

---

## Step 1: Set Up MongoDB

You need a MongoDB connection URL. Choose one option below.

### Option A: MongoDB Atlas (Cloud — Free, Recommended)

1. Go to [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Click **"Sign Up"** and create a free account
3. Click **"Build a Database"** and choose the **M0 Free** tier
4. Pick a region close to you and click **"Create"**
5. Create a database user: set a **Username** and **Password** (remember these)
6. Under **"Connect"**, click **"Connect your application"**
7. Copy the connection string. It looks like this:
   ```
   mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/personal-vault?retryWrites=true&w=majority
   ```
8. Replace `your_username` and `your_password` with the database user credentials you created

### Option B: Local MongoDB (Install on Your Machine)

1. Go to [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Download **MongoDB Community Server** for Windows
3. Run the installer:
   - Choose **"Complete"** installation
   - Check **"Install MongoDB as a Service"**
   - Keep all other defaults
4. Finish installation — MongoDB will run automatically on `localhost:27017`
5. No URL change needed — the default URL in `.env` already works

---

## Step 2: Configure Environment Variables

Open `backend/.env` and update the values:

```env
PORT=5000

# If using MongoDB Atlas, paste your Atlas URL here:
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/personal-vault?retryWrites=true&w=majority

# If using local MongoDB, keep this:
# MONGODB_URI=mongodb://localhost:27017/personal-vault

# Change these to your own secret values:
JWT_SECRET=my_super_secret_jwt_key_123
ENCRYPTION_KEY=my_32_character_encryption_key!!
```

**Important:** Change `JWT_SECRET` and `ENCRYPTION_KEY` to random strings you make up. Never share them.

---

## Step 3: Install Dependencies

### Install Backend Dependencies

Open a terminal and run:

```bash
cd backend
npm install
```

### Install Frontend Dependencies

Open a **new terminal** (keep the first one running) and run:

```bash
cd frontend
npm install
```

### Install Root Dependencies (Optional — for running both together)

Go back to the project root folder:

```bash
cd ..
npm install
```

This installs `concurrently` so you can start both frontend and backend with one command.

---

## Step 4: Start the Application

### Method 1: Start Both Together (from root)

```bash
npm run dev
```

This starts the backend on `http://localhost:5000` and the frontend on `http://localhost:3000` at the same time.

### Method 2: Start Separately

**Terminal 1 — Backend:**
```bash
cd backend
npm start
```
You should see:
```
Connected to MongoDB
Server running on http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
You should see:
```
ready - started server on 0.0.0.0:3000
```

---

## Step 5: Use the Application

1. Open your browser and go to **http://localhost:3000**
2. You will see the login page with a pink + blue glassmorphism design
3. Click **"Register"** to create a new account (enter email, username, password)
4. After registering, you will be redirected to the **Dashboard**
5. Use the navigation bar to access:
   - **Passwords** — Add your first password entry
   - **Notes** — Create personal notes
   - **Diary** — Write your first diary entry with a mood
   - **Settings** — View your account info
6. Click **"Logout"** when you are done

---

## API Endpoints

### Authentication
| Method | Endpoint           | Description         |
|--------|--------------------|---------------------|
| POST   | `/api/auth/register` | Create account    |
| POST   | `/api/auth/login`    | Login             |
| POST   | `/api/auth/logout`   | Logout            |
| GET    | `/api/auth/me`       | Get current user  |

### Passwords
| Method | Endpoint              | Description           |
|--------|-----------------------|-----------------------|
| POST   | `/api/passwords`      | Create password entry |
| GET    | `/api/passwords`      | Get all passwords     |
| GET    | `/api/passwords/:id`  | Get one password      |
| PUT    | `/api/passwords/:id`  | Update password       |
| DELETE | `/api/passwords/:id`  | Delete password       |

### Notes
| Method | Endpoint           | Description      |
|--------|--------------------|------------------|
| POST   | `/api/notes`       | Create note      |
| GET    | `/api/notes`       | Get all notes    |
| PUT    | `/api/notes/:id`   | Update note      |
| DELETE | `/api/notes/:id`   | Delete note      |

### Diary
| Method | Endpoint           | Description         |
|--------|--------------------|---------------------|
| POST   | `/api/diary`       | Create diary entry  |
| GET    | `/api/diary`       | Get all entries     |
| PUT    | `/api/diary/:id`   | Update entry        |
| DELETE | `/api/diary/:id`   | Delete entry        |

---

## Security

- Login passwords are hashed with **bcrypt** (never stored as plain text)
- Vault passwords are encrypted with **AES-256-CBC**
- All API routes (except login/register) require **JWT authentication**
- Passwords are hidden by default in the UI
- Cookies are set as **httpOnly** for protection against XSS

---

## Troubleshooting

### "MongoDB connection error"
- Make sure MongoDB is running (local) or your Atlas URL is correct
- Check that your IP is whitelisted in Atlas (under Network Access)

### "Cannot connect to server"
- Make sure the backend is running on port 5000
- Make sure `backend/.env` has the correct `MONGODB_URI`

### Frontend shows "Failed to load"
- Make sure both backend AND frontend are running
- Check the browser console (F12) for error details

### Port already in use
- Change the port in `backend/.env` (e.g., `PORT=4001`)
- For frontend, run `npm run dev -- -p 3001` to use a different port

---

## License

This is a personal project for private use.

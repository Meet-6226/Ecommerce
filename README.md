# Fashion Retail Commerce Platform

A responsive modern fashion retail platform built with a decoupled architecture.

## Architecture

- **Frontend**: HTML, Vanilla JavaScript, Tailwind CSS (v4 CLI)
- **Backend**: Node.js, Express.js, MySQL

## Prerequisites

- Node.js (v18 or higher recommended)
- MySQL Server

## Project Setup

### 1. Database Setup
1. Ensure MySQL is running on your local machine.
2. Open your MySQL client and execute the SQL scripts found in `backend/database/`:
   - First, run `schema.sql` to create the database and tables.
   - Second, run `seed.sql` to insert dummy products.
3. Configure your database credentials in `backend/.env`:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=fashion_retail
   ```

### 2. Backend Setup
Navigate to the backend directory, install dependencies, and start the server:
```bash
cd backend
npm install
npm run dev
# OR
node server.js
```
The API will run on `http://localhost:5000`.

### 3. Frontend Setup
Navigate to the frontend directory, install dependencies, and start the development server:
```bash
cd frontend
npm install
npm start
```
This will concurrently start the `http-server` (usually on port 3000 or 8080) and run the `@tailwindcss/cli` build watcher.

Open the displayed local URL (e.g., `http://127.0.0.1:3000`) in your browser to view the application.

## Folder Structure

```
fashion-retail-platform/
│
├── frontend/
│   ├── index.html        (Home page)
│   ├── products.html     (Product listing)
│   ├── product.html      (Product detail)
│   ├── cart.html         (Shopping cart)
│   ├── checkout.html     (Checkout flow)
│   ├── admin.html        (Admin product management)
│   ├── css/              (Tailwind source and output)
│   └── js/               (Vanilla JS logic and API calls)
│
└── backend/
    ├── server.js         (Express entry)
    ├── routes/           (API routes)
    ├── controllers/      (Route handlers)
    ├── config/           (Database config)
    └── database/         (SQL schema and seed files)
```



# CRUD Application with JWT Authentication

This is a simple CRUD application built using React for the frontend and MySQL for the backend, implementing JWT token-based authentication. The application allows users to manage categories and services with authenticated requests.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication with JWT tokens
- Create, Read, Update, and Delete categories
- Create, Read, Update, and Delete services within categories
- Responsive UI built with Tailwind CSS
- Clean and modular code structure

## Tech Stack

- **Frontend:** React, Tailwind CSS, Axios
- **Backend:** Node.js, Express, MySQL
- **Authentication:** JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- MySQL (v5.7 or higher)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/my-crud-app.git
   cd my-crud-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up your MySQL database:**

   - Create a database (e.g., `crud_app_db`).
   - Update the database configuration in the backend code (`config/db.js`).

4. **Run the backend server:**

   Navigate to the backend directory (if applicable) and run:

   ```bash
   npm run start
   ```

5. **Run the frontend application:**

   ```bash
   npm start
   ```

6. **Open your browser and visit:**

   ```
   http://localhost:3000
   ```

## API Endpoints

### Authentication

- **Login**
  - `POST /api/auth/login`
  - Body: `{ "email": "admin@codesfortomorrow.com", "password": "Admin123!@#" }`
  - Returns: JWT token

### Categories

- **Create Category**
  - `POST /api/category`
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "name": "Category Name" }`

- **Get All Categories**
  - `GET /api/categories`
  - Headers: `Authorization: Bearer <token>`

- **Update Category**
  - `PUT /api/category/:categoryId`
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "name": "Updated Category Name" }`

- **Delete Category (Only if empty)**
  - `DELETE /api/category/:categoryId`
  - Headers: `Authorization: Bearer <token>`

### Services

- **Create Service**
  - `POST /api/category/:categoryId/service`
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "name": "Service Name", "type": "Normal", "priceOptions": [{ "duration": "1 Hour", "price": 100, "type": "Hourly" }] }`

- **Get Services in Category**
  - `GET /api/category/:categoryId/services`
  - Headers: `Authorization: Bearer <token>`

- **Update Service**
  - `PUT /api/category/:categoryId/service/:serviceId`
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "name": "Updated Service Name", "priceOptions": [{ "duration": "1 Hour", "price": 150, "type": "Hourly" }] }`

- **Delete Service**
  - `DELETE /api/category/:categoryId/service/:serviceId`
  - Headers: `Authorization: Bearer <token>`

## Usage

1. Start the backend server.
2. Start the frontend application.
3. Use the provided login credentials to log in.
4. Use the application to manage categories and services.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.


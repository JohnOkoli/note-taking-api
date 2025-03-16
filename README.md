# Note-Taking API

A robust RESTful API for managing notes with categories, built with Node.js, Express, TypeScript, and MongoDB.

## Overview

This Note-Taking API provides a complete backend solution for creating, retrieving, updating, and deleting notes. It features category organization, data validation, error handling, and logging middleware. The application is built with modern TypeScript practices and follows a clean architecture pattern.

## Features

- **Complete CRUD Operations**: Create, read, update, and delete notes
- **Category Management**: Organize notes by categories
- **Data Validation**: Input validation for all API endpoints
- **Error Handling**: Comprehensive error handling with custom error types
- **Logging Middleware**: Request logging for debugging and monitoring
- **TypeScript**: Type-safe code with interfaces and models
- **MongoDB Integration**: Persistent storage with Mongoose ODM
- **Environment Configuration**: Support for different environments via dotenv

## Project Structure

```
note-taking-api/
├── src/
│   ├── controllers/
│   │   └── noteController.ts       # Note CRUD operations logic
│   ├── middlewares/
│   │   ├── errorHandler.ts         # Global error handling middleware
│   │   ├── loggingMiddleware.ts    # Request logging middleware
│   │   └── validateNote.ts         # Note validation middleware
│   ├── models/
│   │   ├── noteModel.ts            # Mongoose model for notes
│   │   └── categoryModel.ts        # Mongoose model for categories
│   ├── routes/
│   │   └── noteRoutes.ts           # API route definitions
│   ├── types/
│   │   ├── customErrors.ts         # Custom error classes
│   │   └── note.ts                 # TypeScript interfaces for notes
│   ├── app.ts                      # Express app configuration
│   └── server.ts                   # Server entry point
├── .env                            # Environment variables (not in repo)
├── package.json                    # Project dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # Project documentation
```

## API Endpoints

| Method | Endpoint                          | Description                          |
|--------|-----------------------------------|--------------------------------------|
| GET    | /notes                            | Get all notes                       |
| GET    | /notes/:id                       | Get a specific note by ID          |
| POST   | /notes                            | Create a new note                  |
| PUT    | /notes/:id                       | Update an existing note            |
| DELETE | /notes/:id                       | Delete a note                      |
| GET    | /notes/category/:categoryId      | Get all notes in a specific category |

## Data Models

### Note

```typescript
{
  title: string;          // Note title (required)
  content: string;        // Note content (required)
  categoryId: ObjectId;   // Reference to category (required)
  createdAt: Date;        // Creation timestamp (auto-generated)
  updatedAt: Date;        // Last update timestamp (auto-updated)
}
```

### Category

```typescript
{
  name: string;           // Category name (required)
  description: string;    // Category description (optional)
}
```

## Technical Implementation Details

### MongoDB Connection

The application connects to MongoDB using Mongoose. The connection string is configured via environment variables for security and flexibility across different environments.

```typescript
// Connection setup in app.ts
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/note-taking-api';
await mongoose.connect(mongoURI);
```

### Error Handling

A custom error handling system was implemented to provide consistent error responses:

- **Custom Error Class**: Extends the standard Error class with status codes
- **Global Error Handler**: Middleware that catches and formats all errors
- **Specific Error Types**: Different error types for various scenarios (not found, validation, etc.)

```typescript
// Example of error handling in controllers
try {
    // Operation code
} catch (error) {
    if (error instanceof CustomError) {
        next(error);
    } else {
        next(new CustomError('Operation failed', 500));
    }
}
```

### Validation

Input validation is performed at multiple levels:

- **Middleware Validation**: Validates request body before reaching controllers
- **Mongoose Schema Validation**: Ensures data integrity at the database level
- **ObjectId Validation**: Ensures IDs are in the correct format

```typescript
// Example of validation in middleware
if (!title || !content || !categoryId) {
    throw new CustomError('Title, content, and categoryId are required', 400);
}
```

### Logging

A logging middleware captures all incoming requests with:

- Request method
- URL path
- Timestamp
- Request body (for debugging)

## Setup and Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/note-taking-api.git
   cd note-taking-api
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file

   ```
   MONGODB_URI=mongodb://localhost:27017/note-taking-api
   PORT=3000
   ```

4. Build the project

   ```bash
   npm run build
   ```

5. Start the server

   ```bash
   npm start
   ```

## Development

- Run in development mode (with hot reloading)

  ```bash
  npm run dev
  ```

- Build for production

  ```bash
  npm run build
  ```

- Run production server

  ```bash
  npm run serve
  ```

## Improvements and Fixes

Several improvements and fixes were made to enhance the API:

- **MongoDB Connection**: Updated to use environment variables from `.env` file for better security and configuration flexibility.
- **Error Handling Enhancements**:
  - Added ObjectId validation to prevent MongoDB errors.
  - Improved error messages for better client feedback.
  - Added specific error handling for different scenarios.
- **Validation Improvements**:
  - Added comprehensive input validation for all endpoints.
  - Implemented validation for MongoDB ObjectId format.
  - Added length and type validation for note fields.
- **Automatic Timestamps**:
  - Ensured `updatedAt` field is automatically updated on note modifications.
  - Added `runValidators` option to ensure validation runs on updates.
- **Package Configuration**:
  - Fixed the main entry point in `package.json`.
  - Added `dotenv` dependency for environment variable management.
  - Added `nodemon` for improved development experience.
- **Category Validation**:
  - Added checks to ensure categories exist before associating notes.
  - Implemented proper error handling for category-related operations.

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **TypeScript**: Programming language
- **MongoDB**: Database
- **Mongoose**: MongoDB object modeling
- **dotenv**: Environment variable management
- **nodemon**: Development server with hot reloading

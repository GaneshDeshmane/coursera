# Coursera

A backend project for an online course platform.

I built this to practice backend development and understand how authentication, authorization, courses and purchases can work together in a real application.

## Features

### Users

- Sign up
- Sign in
- JWT authentication
- View available courses
- Purchase courses
- View purchased courses

### Admins

- Sign up
- Sign in
- Create courses
- Update courses
- Delete courses
- View their courses

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Zod

## Authentication

The application uses JWT for authentication and bcrypt for password hashing.

There are separate flows for users and admins, with middleware protecting the required routes.

## API Routes

### User

```text
POST /user/signup
POST /user/signin
GET  /user/purchases

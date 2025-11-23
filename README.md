# Anotes app using MongoDB and Express JS
## About

A simple note-taking backend built with Node.js, Express and MongoDB. It provides a lightweight REST API to create, read, update and delete notes.

## Features

- Create, read, update and delete notes
- JSON-based REST API
- MongoDB persistence (Mongoose)
- Development-friendly (nodemon support)

## Tech stack

- Node.js
- Express
- MongoDB (Mongoose)
- npm

## Prerequisites

- Node.js >= 14
- MongoDB instance (local or hosted)

## Quickstart

1. Install dependencies
```bash
npm install
```

2. Create a .env file (example)
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/anotes
```

3. Start the app
```bash
# development
npm run dev

# production
npm start
```

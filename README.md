# Movie Watchlist Backend

A RESTful API backend for a Movie Watchlist application built with Node.js, Express, and MongoDB.

## Features

- 📝 Create, read, update, and delete movie reviews
- 🎬 Manage personal movie watchlist
- 🗄️ MongoDB database integration
- 🔒 CORS-enabled for frontend integration
- ⚡ Fast and scalable Express.js server

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **Environment Variables:** dotenv
- **CORS:** Enabled for cross-origin requests

## Project Structure

```
MovieWatchlist-BE/
├── api/
│   ├── reviews.controller.js    # Review business logic
│   ├── reviews.route.js          # Review route definitions
│   ├── watchlist.controller.js  # Watchlist business logic
│   └── watchlist.route.js        # Watchlist route definitions
├── dao/
│   ├── reviewsDAO.js             # Reviews data access layer
│   └── watchlistDAO.js           # Watchlist data access layer
├── index.js                      # Application entry point
├── server.js                     # Express app configuration
└── package.json                  # Dependencies and scripts
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd MovieWatchlist-BE
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
MONGO_USERNAME=your_mongodb_username
MONGO_PASSWORD=your_mongodb_password
```

4. Start the server:
```bash
node index.js
```

The server will run on `http://localhost:5000`

## API Endpoints

### Reviews API (`/api/v1/reviews`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all reviews |
| GET | `/movie/:id` | Get all reviews for a specific movie |
| GET | `/:id` | Get a single review by ID |
| POST | `/new` | Create a new review |
| PUT | `/:id` | Update a review |
| DELETE | `/:id` | Delete a review |

#### Example Review Request (POST `/api/v1/reviews/new`):
```json
{
  "movieId": "12345",
  "review": "Great movie!",
  "rating": 5,
  "user": "username"
}
```

### Watchlist API (`/api/v1/watchlist`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get user's watchlist |
| POST | `/add` | Add a movie to watchlist |
| DELETE | `/:id` | Remove a movie from watchlist |

#### Example Watchlist Request (POST `/api/v1/watchlist/add`):
```json
{
  "movieId": "12345",
  "title": "Movie Title",
  "poster": "poster_url",
  "user": "username"
}
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGO_USERNAME` | MongoDB Atlas username |
| `MONGO_PASSWORD` | MongoDB Atlas password |

## Database Configuration

The application connects to MongoDB Atlas with the following configuration:
- Connection pooling: Max 50 connections
- Write timeout: 2500ms
- Automatic reconnection enabled

## Error Handling

- All undefined routes return a 404 error with JSON response
- Database connection errors are logged and cause the process to exit
- Individual endpoint errors are handled by their respective controllers

## Development

To run in development mode with auto-reload, you can install nodemon:

```bash
npm install --save-dev nodemon
```

Then add a script to `package.json`:
```json
"scripts": {
  "dev": "nodemon index.js",
  "start": "node index.js"
}
```

Run with:
```bash
npm run dev
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/Feature`)
3. Commit your changes (`git commit -m 'Add some Feature'`)
4. Push to the branch (`git push origin feature/Feature`)
5. Open a Pull Request


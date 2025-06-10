# 🎬 MoviesVerse

MoviesVerse is a full-stack web application that allows users to register, log in, and manage a personalized watchlist of movies. The app uses [TMDB API](https://www.themoviedb.org/documentation/api) to fetch real-time movie data and stores user-specific watchlists in a PostgreSQL database.

## 📌 Features

- 🔐 User registration and login
- 🎞️ Search and explore close to a 1 million movies using TMDB API
- ✅ Add or remove movies from personal watchlist
- 📋 View saved watchlist with movie details
- 💾 Persistent backend using PostgreSQL and JPA
- 🌐 RESTful API with Spring Boot

## 🛠️ Tech Stack

### Backend (In Progress)
- Java 17
- Spring Boot
- Spring Data JPA (Hibernate)
- PostgreSQL
- TMDB API
- Maven

### Frontend
- React.js 
- Tailwind CSS 
- Axios API for calling backend

## 🗃️ Project Structure

```
com.moviesverse.watchlist
├── controller // REST controllers for user and watchlist operations
├── model // Entity classes (User, Watchlist)
├── repository // Spring Data JPA interfaces
├── service // Business logic
└── MoviesVerseApplication.java
```

## ⚙️ Setup & Installation

### Prerequisites

- Java 17+
- Maven
- PostgreSQL
- TMDB API Key

### Steps

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/moviesverse.git
cd moviesverse
```
2. Configure PostgreSQL:

Create a database named moviesverse_db (or your choice) and update application.properties:
```bash
spring.datasource.url=jdbc:postgresql://localhost:5432/moviesverse_db
spring.datasource.username=your_pg_username
spring.datasource.password=your_pg_password
spring.jpa.hibernate.ddl-auto=update
tmdb.api.key=your_tmdb_api_key
server.port=8080
```
3. Build the App then the backend will start on http://localhost:8080.

## 📂 API Endpoints (Sample)

### 🧑‍💼 Authentication

| Method | Endpoint             | Description         |
|--------|----------------------|---------------------|
| POST   | `/api/auth/register` | Register new user   |
| POST   | `/api/auth/login`    | User login          |

### 🎬 Movie Search (TMDB Integration)

| Method | Endpoint              | Description                 |
|--------|-----------------------|-----------------------------|
| GET    | `/api/movies/search`  | Search movies using TMDB API |

### 📋 Watchlist

| Method | Endpoint               | Description                         |
|--------|------------------------|-------------------------------------|
| POST   | `/api/watchlist/add`   | Add a movie to user's watchlist     |
| DELETE | `/api/watchlist/remove/{movieId}` | Remove movie from watchlist     |
| GET    | `/api/watchlist/view`  | Get user's saved watchlist          |


### 🎯 Future Improvements
🔐 Integrate Spring Security with JWT
🧠 Recommendation system (based on interests or genres also)

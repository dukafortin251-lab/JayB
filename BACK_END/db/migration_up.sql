-- 1. Table users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

-- 2. Table tracks
CREATE TABLE IF NOT EXISTS tracks (
    id SERIAL PRIMARY KEY,
    title VARCHAR (255) NOT NULL,
    bpm INT,
    musical_key VARCHAR (50),
    user_id INT REFERENCES users(id) ON DELETE CASCADE
);

--3. Table genres 
CREATE TABLE IF NOT EXISTS genres(
    id SERIAL PRIMARY KEY,
    name VARCHAR (100) UNIQUE NOT NULL
);


-- 4. Table de liaison track_genres (Many-to-Many)
CREATE TABLE IF NOT EXISTS track_genres (
    track_id INT REFERENCES tracks(id) ON DELETE CASCADE,
    genre_id INT REFERENCES genres(id) ON DELETE CASCADE,
    PRIMARY KEY (track_id, genre_id)
);
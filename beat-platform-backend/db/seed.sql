-- 1. Un utilisateur simple
INSERT INTO users (email, password_hash) VALUES 
('test@test.com', '123456');

-- 2. Un track basique lié à cet utilisateur (id 1)
INSERT INTO tracks (title, bpm, musical_key, user_id) VALUES 
('Mon Premier Beat', 120, 'C', 1);

-- 3. Un genre simple
INSERT INTO genres (name) VALUES 
('Hip-Hop');

-- 4. Le lien entre le track et le genre
INSERT INTO track_genres (track_id, genre_id) VALUES 
(1, 1);
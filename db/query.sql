-- CREATE TABLE recipes (
--     id SERIAL PRIMARY KEY,
--     title VARCHAR(255) NOT NULL,
--     description TEXT
-- );

-- CREATE TABLE ingredients (
--     id SERIAL PRIMARY KEY,
--     recipe_id INT REFERENCES recipes(id) ON DELETE CASCADE,
--     name VARCHAR(255) NOT NULL,
--     quantity FLOAT,
--     quantity_fraction VARCHAR(20),
--     unit VARCHAR(50)
-- );

-- CREATE TABLE steps (
--     id SERIAL PRIMARY KEY,
--     recipe_id INT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
--     step_number INT NOT NULL,
--     description TEXT NOT NULL
-- );

-- CREATE TABLE tags (
--     id SERIAL PRIMARY KEY,
--     recipe_id INT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
--     tag VARCHAR(50) NOT NULL
-- );


    


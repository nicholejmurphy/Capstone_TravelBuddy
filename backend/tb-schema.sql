
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  first_name VARCHAR(25) NOT NULL,
  last_name VARCHAR(25) NOT NULL
);

CREATE TABLE saved_locations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER
    REFERENCES users ON DELETE CASCADE,
  location_id TEXT NOT NULL,
  name TEXT NOT NULL,
  address_string TEXT
);

-- CREATE TABLE saved_translations (
--   id SERIAL PRIMARY KEY,
--   user_id INTEGER 
--     REFERENCES users ON DELETE CASCADE,
--   from_language TEXT NOT NULL,
--   to_language TEXT NOT NULL,
--   from_text TEXT NOT NULL,
--   to_text TEXT NOT NULL
-- );

-- CREATE TABLE saved_conversions (
--   id SERIAL PRIMARY KEY,
--   user_id INTEGER 
--     REFERENCES users ON DELETE CASCADE,
--   from_currency TEXT NOT NULL,
--   to_currency TEXT NOT NULL,
--   from_amount DECIMAL(13,2) NOT NULL,
--   to_amount DECIMAL(13,2) NOT NULL
-- );

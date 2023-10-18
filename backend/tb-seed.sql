-- test user has the password "password"

INSERT INTO users (username,
                   password, 
                   first_name, 
                   last_name)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User'
        );

-- DECLARE user_id INTEGER
-- SELECT user_id = id FROM users WHERE username = "testuser";

-- INSERT INTO saved_locations (user_id, location_id, name, address_string)
-- VALUES (user_id, '60742', 'Asheville', 'Asheville, NC' ),
--        (user_id, '49649', 'Weaverville', 'Weaverville, NC' ),
--        (user_id, '42492', 'Mount Pleasant', 'Mount Pleasant, MI' ),
--        (user_id, '28951', 'New Jersey', 'NJ' );

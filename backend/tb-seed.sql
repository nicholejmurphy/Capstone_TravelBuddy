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




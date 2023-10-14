\echo 'Delete and recreate travelbuddy db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE travelbuddy;
CREATE DATABASE travelbuddy;
\connect travelbuddy

\i tb-schema.sql
\i tb-seed.sql

\echo 'Delete and recreate travelbuddy_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE travelbuddy_test;
CREATE DATABASE travelbuddy_test;
\connect travelbuddy_test

\i tb-schema.sql

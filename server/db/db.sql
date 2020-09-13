CREATE DATABASE educationportal;

CREATE TABLE teachers (
    t_id SERIAL PRIMARY KEY,
    t_name TEXT NOT NULL,
    t_email TEXT NOT NULL UNIQUE,
    t_password TEXT NOT NULL
);

CREATE TABLE students (
    s_id SERIAL PRIMARY KEY,
    s_name TEXT NOT NULL,
    s_email TEXT NOT NULL UNIQUE,
    s_password TEXT NOT NULL
);

CREATE TABLE courses (
    c_id SERIAL PRIMARY KEY,
    ct_id INTEGER REFERENCES teachers(t_id),
    c_name TEXT NOT NULL,
    c_description TEXT NOT NULL,
    c_poster TEXT NOT NULL
);

CREATE TABLE tasks (
    h_id SERIAL PRIMARY KEY,
    cc_id INTEGER NOT NULL REFERENCES courses(c_id),
    h_name TEXT NOT NULL,
    h_description TEXT,
    h_file TEXT NOT NULL
);

CREATE TABLE studentscourses (
    sc_id INTEGER NOT NULL REFERENCES students(s_id),
    cc_id INTEGER NOT NULL REFERENCES courses(c_id)
);

/* CREATE VIEW teacherscourses
AS
    SELECT * FROM courses 
        JOIN
        (SELECT t_id, t_name, t_email FROM teachers) AS t ON ct_id = t_id; */

/* CREATE VIEW teacherscoursesinfo
AS
    SELECT * FROM courses 
        JOIN
        (SELECT t_id, t_name, t_email FROM teachers) AS t ON ct_id = t_id; */

CREATE TABLE delivery (
    d_id SERIAL PRIMARY KEY,
    dh_id INTEGER REFERENCES tasks(h_id),
    ds_id INTEGER REFERENCES students(s_id),
    d_file TEXT NOT NULL,
    d_filename TEXT
);
-- backend/db/schema.sql
CREATE DATABASE learning_style_quiz;

\c learning_style_quiz;

-- Users table to store both students and TAs
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    role VARCHAR(10) NOT NULL CHECK (role IN ('student', 'ta')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses table to store course information
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Association table linking TAs to courses
CREATE TABLE ta_courses (
    id SERIAL PRIMARY KEY,
    ta_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    course_code VARCHAR(3) NOT NULL,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE
);

-- Quiz responses table
CREATE TABLE quiz_responses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    question_number INTEGER NOT NULL,
    answer_index INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Learning styles table
CREATE TABLE learning_styles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    primary_style VARCHAR(50) NOT NULL,
    secondary_style VARCHAR(50),
    score JSONB,  -- Store detailed scoring breakdown
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

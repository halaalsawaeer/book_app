DROP TABLE books;
CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(1000),
  author VARCHAR(1000),
  isbn VARCHAR(1000),
  image_url VARCHAR(1000),
  description TEXT
);
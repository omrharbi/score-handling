-- database: :memory:
CREATE TABLE score(
    id integer primary key AUTOINCREMENT,
    name text,
    score integer,
    rank text,
    time  text
);
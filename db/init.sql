drop table if exists users;
create table users(
    id serial primary key,
    auth0_id text not null,
    email text not null,
    name text not null,
    picture text not null
);
create table post (
    id serial primary key,
    title text,
    img text,
    content text, 
    author_id int references users(id)
);
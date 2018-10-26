drop table if exists users;
create table users(
    id serial primary key,
    auth0_id text not null,
    email text not null,
    name text not null,
    picture text not null
);
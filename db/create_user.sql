insert into users (auth0_id, email, name, picture) 
values ($1, $2, $3, $4) returning *;
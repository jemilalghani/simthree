select * from post p
join users u on u.id = p.author_id
where author_id=$1;
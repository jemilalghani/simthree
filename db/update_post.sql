update post set title=$2, img=$3, content=$4 where id=$1
returning *;
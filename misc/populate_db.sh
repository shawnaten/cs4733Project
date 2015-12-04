docker run \
-it \
--link project_db_1:db \
--rm \
tutum/mongodb \
/bin/bash

mongoimport \
--collection users \
--db bank \
--drop \
--file fake_bank.json \
--host db

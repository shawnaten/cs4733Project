docker run \
-it \
--link mongodb:mongodb \
--rm \
-v "$PWD":/volume1 \
-w="/volume1" \
tutum/mongodb \
mongoimport \
--collection users \
--db bank \
--drop \
--file docs/fake_bank.json \
--host mongodb

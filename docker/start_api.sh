docker run \
-e "PORT=80" \
-e "EMAIL_PASS=$EMAIL_PASS" \
-it \
--link mongodb:mongodb \
--name api \
-p 80:80 \
--rm \
-v "$PWD":/volume1 \
-w="/volume1" \
node \
/bin/bash

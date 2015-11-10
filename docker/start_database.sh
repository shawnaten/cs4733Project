docker run \
-d \
-e AUTH=no \
--name mongodb \
-p 27017:27017 \
-p 28017:28017 \
tutum/mongodb

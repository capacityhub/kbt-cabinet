#!/usr/bin/env bash
version=`date +%Y%m%d%H%M%S`;
echo "build admin version $version"
npm run build:prod

docker rm `docker ps -a -q`

docker rmi --force `docker images | grep kbt-cabinet | awk '{print $3}'`
docker rmi --force `docker images | grep none | awk '{print $3}'`

docker build -t kbt-cabinet:$version ./docker



docker tag kbt-cabinet:$version 10.10.208.193:5000/kbt-cabinet:$version

docker push 10.10.208.193:5000/kbt-cabinet:$version

echo "build admin sucess 10.10.208.193:5000/kbt-cabinet:$version"


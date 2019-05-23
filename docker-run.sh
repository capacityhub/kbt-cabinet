#!/usr/bin/env bash
docker stop kbt-cabinet
docker rm `docker ps -a -q`
docker run -d  --privileged=true -p 8092:8092 --name kbt-cabinet 10.10.208.193:5000/kbt-cabinet:20190521111226

docker logs -f kbt-cabinet

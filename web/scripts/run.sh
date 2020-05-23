#!/usr/bin/env bash

pushd "$(dirname "$0")" > /dev/null 2>&1

docker rm -f chrismeyers-info-web
docker run \
    $1 \
    -p 8080:80 \
    --log-opt max-size=25m \
    --log-opt max-file=2 \
    --name chrismeyers-info-web \
    chrismeyers-info-web

popd > /dev/null 2>&1

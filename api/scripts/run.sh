#!/usr/bin/env bash

pushd "$(dirname "$0")" > /dev/null 2>&1

docker rm -f chrismeyers-info-api
docker run \
    -d \
    --net=host \
    --log-opt max-size=25m \
    --log-opt max-file=2 \
    --name chrismeyers-info-api \
    --restart always \
    chrismeyers-info-api

popd > /dev/null 2>&1
#!/usr/bin/env bash

pushd "$(dirname "$0")" > /dev/null 2>&1

docker stop chrismeyers-info-api
docker rm chrismeyers-info-api
docker run \
    "$@" \
    --net=host \
    --log-opt max-size=25m \
    --log-opt max-file=2 \
    --name chrismeyers-info-api \
    chrismeyers-info-api

popd > /dev/null 2>&1

#!/usr/bin/env bash

pushd "$(dirname "$0")" > /dev/null 2>&1

docker stop chrismeyers-website-api
docker rm chrismeyers-website-api
docker run \
    "$@" \
    -p 8888:8888 \
    --log-opt max-size=25m \
    --log-opt max-file=2 \
    --name chrismeyers-website-api \
    chrismeyers-website-api

popd > /dev/null 2>&1

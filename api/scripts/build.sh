#!/usr/bin/env bash

pushd "$(dirname "$0")" > /dev/null 2>&1

(
    cd .. \
    && cp -r ../resume . \
    && docker build $1 -t chrismeyers-info-api . \
    && rm -rf resume
)

popd > /dev/null 2>&1

#!/usr/bin/env bash

pushd "$(dirname "$0")" > /dev/null 2>&1

(
    cd .. \
    && docker build $1 -t chrismeyers-info-web .
)

popd > /dev/null 2>&1

#!/usr/bin/env bash

pushd "$(dirname "$0")" > /dev/null 2>&1

(
    cd .. \
    && cp -r ../resume . \
    && docker build "$@" --force-rm -t chrismeyers-website-api . \
    && rm -rf resume
)

popd > /dev/null 2>&1

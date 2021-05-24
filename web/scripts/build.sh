#!/usr/bin/env bash

pushd "$(dirname "$0")" > /dev/null 2>&1

(
    cd .. \
    && docker build "$@" --force-rm -t chrismeyers-website-web .
)

popd > /dev/null 2>&1

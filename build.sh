#!/usr/bin/env bash

set -e

pushd patcher > /dev/null
npm run --silent patch-browser-bundle > ../mod/asciidoctor.js
npm run --silent patch-types > ../mod/mod.d.ts
npm run --silent get-asciidoctor-version > ../VERSION
popd > /dev/null

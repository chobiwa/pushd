#!/bin/bash
pm2 delete pushd
pm2 start "./node_modules/.bin/coffee pushd.coffee" --name "pushd" -o "out.log" -e "err.log"
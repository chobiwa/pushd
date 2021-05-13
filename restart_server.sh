#!/bin/bash
pm2 delete pushd
pm2 start "node server.js" --name "pushd" -o "out.log" -e "err.log"
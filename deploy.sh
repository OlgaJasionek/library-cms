#!/bin/bash

ssh root@145.239.86.58 << 'ENDSSH'
cd /var/www/library-cms/frontend

git stash
git fetch
git checkout main
git pull
rm -rf node_modules
npm install
rm -rf ./build
npm run build
systemctl restart nginx.service
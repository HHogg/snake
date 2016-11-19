git checkout gh-pages
git reset --hard master
rm -rf node_modules
rm .gitignore
yarn install --production
mv ./node_modules ./lib
sed -i -- 's/node_modules/lib/g' index.html
rm ./index.html--
git add ./.gitignore
git add ./index.html
git add ./lib/normalize.css/normalize.css
git add ./lib/ace-builds/src-min/ace.js
git add ./lib/ace-builds/src-min/mode-javascript.js
git add ./lib/ace-builds/src-min/worker-javascript.js
git commit -m "GH Pages"
git push upstream gh-pages -f
git checkout master
rm -rf ./lib
git checkout -- index.html

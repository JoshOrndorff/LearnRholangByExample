# Convert tutorial md files into html

cd into a lesson folder

run node ../converter/index.js index.md

The output is in ./index.html

https://marked.js.org/#/USING_PRO.md


```
git clone  https://github.com/rchain-community/LearnRholangByExample
cd LearnRholangByExample
npm install
npm install marked
node converter/index.js README.md
for d in */.; do cd $d;ls *.md| while read f; do node ../converter/index.js $f; done; cd ..; done
find . -name README.html |while read f; do cp -p $f $(echo $f|sed 's/README/index/');done
cd ..
rm -r node-modules
scp -r LearnRholangByExample rchain@rhobot.net:/var/www/html

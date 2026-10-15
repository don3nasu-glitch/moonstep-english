// アプリ版とWeb版を同じ仕様に保つため、Web版の index.html とアイコンをそのまま www にコピーする（音声は同梱しない）
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),www=path.resolve(__dirname,'www');
fs.rmSync(www,{recursive:true,force:true});fs.mkdirSync(www,{recursive:true});
let html=fs.readFileSync(path.join(root,'index.html'),'utf8');
if(!html.includes('const CAP='))throw new Error('index.html is not the current Moonstep build');
const appId=process.env.MS_APP_ID||''; // App Store の数字ID（レビュー画面へのリンク用）
if(appId)html=html.replace('<head>',`<head>\n<script>window.MS_APP_ID=${JSON.stringify(appId)}</script>`);
fs.writeFileSync(path.join(www,'index.html'),html);
for(const f of ['icon-180.png','icon-192.png','icon-512.png','manifest.webmanifest'])if(fs.existsSync(path.join(root,f)))fs.copyFileSync(path.join(root,f),path.join(www,f));
console.log('www ready',(html.length/1048576).toFixed(1)+'MB');

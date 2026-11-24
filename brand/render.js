// Renders brand/logos/*.svg to PNG sizes (transparent) and full-bleed apple-touch icons.
// Usage: node brand/render.js <outdir>   (needs playwright + chromium)
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const dir=path.join(__dirname,'logos');const out=process.argv[2];fs.mkdirSync(out,{recursive:true});
(async()=>{const b=await chromium.launch();const p=await b.newPage();
for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.svg'))){
  const k=f.replace('.svg','');const svg=fs.readFileSync(path.join(dir,f),'utf8');
  for(const n of [16,32,48]){await p.setViewportSize({width:n,height:n});
    await p.setContent(`<style>*{margin:0}svg{display:block;width:${n}px;height:${n}px}</style>${svg}`);
    await p.screenshot({path:path.join(out,`${k}-${n}.png`),omitBackground:true});}
  // apple-touch-icon: 180px, no transparency (iOS fills it black). Tile drawn edge to edge.
  const col=k==='brainstorm'?'#14171C':k.endsWith('-etc')?'#0B5D6B':'#7B1E2E';
  let bg=`<rect x="-6" y="-6" width="76" height="76" fill="${col}"/>`;
  if(k==='tabee-studio') bg+='<path d="M70 -6V70H-6Z" fill="#0B5D6B"/>';
  const inner=svg.replace(/^<svg[^>]*>/,'').replace(/<\/svg>\s*$/,'');
  const innerT=k==='tabee-studio'?inner.replace(/<defs>.*<\/g>/,''):inner;
  const corner=k.endsWith('-etc')?'<path d="M48 -6H70V16Z" fill="#E1F0F2"/>':'';
  const full=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -6 76 76">${bg}${innerT}${corner}</svg>`;
  await p.setViewportSize({width:180,height:180});
  await p.setContent(`<style>*{margin:0}svg{display:block;width:180px;height:180px}</style>${full}`);
  await p.screenshot({path:path.join(out,`${k}-touch.png`),omitBackground:false});
}
await b.close()})();

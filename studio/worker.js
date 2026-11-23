/* TABEE Studio · Auto Check worker. One worker per run: {track:'EAC'|'ETC', files:[{id,name,kind,text}]} */
self.onmessage=function(e){
  try{
    const {track,files}=e.data,base=track==='ETC'?'../pevstudio-etc/js/':'../pevstudio/js/';
    self.TRACK_MAJOR=track==='ETC'?400:1500;
    importScripts(base+'checklist.js',base+'rules.js','engine.js');
    const docs=files.map(f=>prepDoc({id:f.id,name:f.name,kind:f.kind},f.text));
    const meta=files.map(f=>({name:f.name,kind:f.kind}));
    const items=[];
    for(const x of ALL){const r=checkItem(docs,x.c,x,meta);if(!r)continue;
      items.push({c:x.c,g:x.g.n,gh:x.g.h,code:x.it.code,t:x.it.t,r:r.r,score:r.score,n:r.n,req:r.req,ev:r.ev})}
    const flags=scanFlags(docs),fl={};
    for(const c in flags)fl[c]=flags[c].map(x=>({label:x.label,where:x.where,snip:x.snip}));
    const info=docs.map(d=>({name:d.f.name,headed:d.headed,crit:[...new Set(d.hs.map(h=>h[1]))].sort(),chars:d.raw.length}));
    const crits=CHECKLIST.map(c=>({n:c.n,th:c.th,en:c.en}));
    self.postMessage({ok:true,items,flags:fl,info,crits});
  }catch(err){self.postMessage({ok:false,error:String(err&&err.message||err)})}
};

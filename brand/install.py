"""Copy rendered logos into each app folder as favicon files and tag every HTML page.
Usage: node brand/render.js /tmp/png && python3 brand/install.py /tmp/png"""
import os, re, sys, shutil
from PIL import Image
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__))); PNG=sys.argv[1]; LOGOS=os.path.join(ROOT,'brand','logos')
# folder -> (logo, file prefix)
SETS=[('.', 'tabee-studio','favicon'),('pevstudio','pev-studio-eng','favicon'),('pevstudio-etc','pev-studio-etc','favicon'),
      ('pev-training','pev-training-eng','favicon'),('pev-training-etc','pev-training-etc','favicon'),
      ('pev-training','quiz-poll-eng','quiz-poll'),('pev-training-etc','quiz-poll-etc','quiz-poll'),('brainstorm','brainstorm','favicon')]
for folder,logo,pre in SETS:
    d=os.path.join(ROOT,folder)
    shutil.copy(os.path.join(LOGOS,logo+'.svg'),os.path.join(d,pre+'.svg'))
    ims=[Image.open(os.path.join(PNG,f'{logo}-{n}.png')).convert('RGBA') for n in (48,32,16)]
    ims[0].save(os.path.join(d,pre+'.ico'),format='ICO',sizes=[(48,48),(32,32),(16,16)],append_images=ims[1:])
    shutil.copy(os.path.join(PNG,f'{logo}-touch.png'),os.path.join(d,'apple-touch-icon.png' if pre=='favicon' else pre+'-touch.png'))
def tags(rel,pre='favicon'):
    t='apple-touch-icon.png' if pre=='favicon' else pre+'-touch.png'
    return (f'<link rel="icon" href="{rel}{pre}.ico" sizes="any">\n<link rel="icon" href="{rel}{pre}.svg" type="image/svg+xml">\n'
            f'<link rel="apple-touch-icon" href="{rel}{t}">\n')
def page_rule(p):
    r=os.path.relpath(p,ROOT).replace(os.sep,'/'); parts=r.split('/')
    if r=='index.html': return '',  'favicon'
    if r=='pevstudio-sa/index.html': return '../pevstudio-etc/','favicon'
    if parts[0] in ('pevstudio','pevstudio-etc','pev-training','pev-training-etc','brainstorm'):
        up='../'*(len(parts)-2)
        pre='quiz-poll' if len(parts)>2 and parts[1].startswith('assesstrain') else 'favicon'
        return up,pre
    return None
n=0
for dp,dn,fn in os.walk(ROOT):
    dn[:]=[x for x in dn if x not in ('.git','brand')]
    for f in fn:
        if not f.endswith('.html'): continue
        p=os.path.join(dp,f); rule=page_rule(p)
        if rule is None: print('skip',os.path.relpath(p,ROOT)); continue
        s=open(p,encoding='utf-8').read()
        s=re.sub(r'<link rel="icon" href="data:,">\n?','',s)
        s=re.sub(r'<!-- favicon -->\n.*?<!-- /favicon -->\n','',s,flags=re.S)
        i=s.find('</head>'); b=s.find('<body')
        if i<0 or (b>=0 and i>b): i=b
        assert i>0, p
        s=s[:i]+'<!-- favicon -->\n'+tags(*rule)+'<!-- /favicon -->\n'+s[i:]
        open(p,'w',encoding='utf-8').write(s); n+=1
print('tagged',n)

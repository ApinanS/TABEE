import os
EAC="#7B1E2E"; ETC="#0B5D6B"; INK="#14171C"; SPARK="#E8621A"
ROUND='<rect x="2" y="2" width="60" height="60" rx="13" fill="{c}"/>'
CHAMF='<path d="M15 2H44L62 20V49A13 13 0 0 1 49 62H15A13 13 0 0 1 2 49V15A13 13 0 0 1 15 2Z" fill="{c}"/>'
W='#FFFFFF'
G={
 'lens': f'<circle cx="27" cy="27" r="15.5" fill="none" stroke="{W}" stroke-width="6.5"/><path d="M38.5 38.5L51 51" stroke="{W}" stroke-width="9" stroke-linecap="round"/><path d="M19.5 27.5l5 5 9-10" fill="none" stroke="{W}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>',
 'cap': f'<path d="M32 13L58 25L32 37L6 25Z" fill="{W}"/><path d="M17 33v7c0 4.5 6.7 8 15 8s15-3.5 15-8v-7l-15 7z" fill="{W}"/><path d="M53 27v14" stroke="{W}" stroke-width="3.5" stroke-linecap="round"/><circle cx="53" cy="43" r="3.2" fill="{W}"/>',
 'poll': f'<rect x="13" y="30" width="10" height="21" rx="2.5" fill="{W}"/><rect x="27" y="15" width="10" height="36" rx="2.5" fill="{W}"/><rect x="41" y="23" width="10" height="28" rx="2.5" fill="{W}"/>',
 'T': f'<path d="M13 14H51V24H37V51H27V24H13Z" fill="{W}"/>',
 'bulb': f'<path d="M32 10a15 15 0 0 0-9 27c1.8 1.4 3 3.2 3 5.5V44h12v-1.5c0-2.3 1.2-4.1 3-5.5A15 15 0 0 0 32 10Z" fill="{SPARK}"/><rect x="26" y="47" width="12" height="4" rx="2" fill="{W}"/><rect x="28" y="53" width="8" height="3.5" rx="1.75" fill="{W}"/>',
}
def svg(body): return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">{body}</svg>\n'
portal=('<defs><clipPath id="t"><rect x="2" y="2" width="60" height="60" rx="13"/></clipPath></defs>'
  f'<g clip-path="url(#t)"><rect width="64" height="64" fill="{EAC}"/><path d="M64 0V64H0Z" fill="{ETC}"/></g>'+G['T'])
L={
 'tabee-studio': portal,
 'pev-studio-eng': ROUND.format(c=EAC)+G['lens'],
 'pev-studio-etc': CHAMF.format(c=ETC)+G['lens'],
 'pev-training-eng': ROUND.format(c=EAC)+G['cap'],
 'pev-training-etc': CHAMF.format(c=ETC)+G['cap'],
 'quiz-poll-eng': ROUND.format(c=EAC)+G['poll'],
 'quiz-poll-etc': CHAMF.format(c=ETC)+G['poll'],
 'brainstorm': ROUND.format(c=INK)+G['bulb'],
}
for k,b in L.items(): open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'logos',k+'.svg'),'w').write(svg(b))
print(list(L))

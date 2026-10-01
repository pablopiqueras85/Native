import json, re, wave, numpy as np, soundfile as sf
D='/tmp/claude-0/-home-user-Native/da0f4d65-b2a6-5c28-a309-36935fb98804/scratchpad/explicativo'
lines=[l.strip() for l in open(D+'/vo/lines.txt') if l.strip()]
SR=48000
wavs=[sf.read(f'{D}/vo/em_alex/t{i+1}.wav')[0] for i in range(len(lines))]
LEAD=2.0; BREATH=0.55
GAP={3:2.6,11:2.6,16:2.6,22:2.6,27:2.6,5:1.0,10:1.0,14:1.0,19:1.0,24:1.0,26:1.0,28:1.4}
t=LEAD; L=[]
for i,w in enumerate(wavs, start=1):
    if i>1: t+=BREATH+GAP.get(i,0)
    d=len(w)/SR; L.append(dict(t0=round(t,3),dur=round(d,3),text=lines[i-1])); t+=d
DUR=round(t+4.5,2)
vo=np.zeros(int(DUR*SR))
for l,w in zip(L,wavs):
    a=int(l['t0']*SR); vo[a:a+len(w)]+=w
sf.write(D+'/vo/vo.wav',vo,SR)
def chunks(s,mx=50):
    parts=re.findall(r'[^,.:;]+[,.:;]?',s); out=[]
    for p in parts:
        p=p.strip()
        if out and len(out[-1])+1+len(p)<=mx: out[-1]+=' '+p
        else: out.append(p)
    return out
SUBS=[]
for l in L:
    cs=chunks(l['text']); n=sum(len(c) for c in cs); a=l['t0']
    for c in cs:
        b=a+l['dur']*len(c)/n; SUBS.append([round(a,2),round(b,2),c]); a=b
open(D+'/explicativo-plan.js','w').write('window.PLAN='+json.dumps(dict(dur=DUR,lines=L,subs=SUBS),ensure_ascii=False)+';\n')
print('DUR',DUR); [print(i+1,l['t0'],l['dur']) for i,l in enumerate(L)]

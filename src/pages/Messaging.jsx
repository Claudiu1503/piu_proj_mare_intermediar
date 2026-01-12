import { useState } from 'react'
import { Paperclip, Send } from 'lucide-react'

const CONVOS = [
  { id:1, name:'Prof. Ionescu', last:'Vă rog să consultați materialele', online:true },
  { id:2, name:'Grupa 241', last:'Ședința de laborator începe la 10:00', online:false },
  { id:3, name:'Secretariat', last:'Cererea dvs. a fost aprobată', online:false },
]

const MSGS = {
  1: [
    { id:1, from:'them', text:'Bună! Vă rog să consultați materialele pentru cursul de mâine.' },
    { id:2, from:'me', text:'Mulțumesc! Am văzut.' },
  ],
  2: [
    { id:1, from:'them', text:'Ședința de laborator începe la 10:00' },
  ],
  3: [
    { id:1, from:'them', text:'Cererea dvs. a fost aprobată' },
  ]
}

function Bubble({ m }) {
  const mine = m.from==='me'
  return (
    <div style={{display:'flex', justifyContent: mine?'flex-end':'flex-start'}}>
      <div className="card" style={{padding:'8px 12px', borderRadius:12, maxWidth: '68%', background: mine? 'linear-gradient(135deg, var(--mint-500), var(--blue-600))':'var(--bg-elev)', color: mine? '#fff': 'inherit'}}>
        {m.text}
      </div>
    </div>
  )
}

export default function Messaging() {
  const [active, setActive] = useState(1)
  const [text, setText] = useState('')

  return (
    <section className="fade-in">
      <h1 className="page-title">Mesagerie internă</h1>
      <div className="card" style={{display:'grid', gridTemplateColumns:'280px 1fr', gap:12, minHeight:420}}>
        <aside style={{borderRight:'1px solid var(--border)', paddingRight:12}} aria-label="Lista conversații">
          <div style={{display:'grid', gap:8}}>
            {CONVOS.map(c => (
              <button key={c.id} className={`nav-item ${active===c.id?'active':''}`} onClick={()=>setActive(c.id)} style={{justifyContent:'space-between'}} aria-label={`Conversație cu ${c.name}`}>
                <span>{c.name}</span>
                <span className="small muted">{c.online?'online':'offline'}</span>
              </button>
            ))}
          </div>
        </aside>
        <div style={{display:'flex', flexDirection:'column', gap:12}}>
          <div className="small muted">Conversație cu <strong>{CONVOS.find(x=>x.id===active)?.name}</strong></div>
          <div style={{flex:1, display:'grid', gap:10}} aria-live="polite">
            {(MSGS[active]||[]).map(m => <Bubble key={m.id} m={m} />)}
          </div>
          <div className="row" style={{alignItems:'center', gap:8}}>
            <button className="btn outline" aria-label="Atașează fișier"><Paperclip size={16}/> Atașează</button>
            <input className="input" placeholder="Scrie un mesaj" value={text} onChange={e=>setText(e.target.value)} aria-label="Scrie un mesaj" />
            <button className="btn" aria-label="Trimite mesaj"><Send size={16}/> Trimite</button>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useMemo, useState } from 'react'
import { AlertCircle, Filter, Search } from 'lucide-react'

const DATA = [
  { id:1, title:'Programare examen Algoritmi', date:'2025-12-20', author:'Decanat', category:'facultate', important:true, read:false },
  { id:2, title:'Laborator reprogramat', date:'2025-11-15', author:'Prof. Ionescu', category:'curs', important:false, read:false },
  { id:3, title:'Sesiune burse', date:'2025-11-30', author:'Secretariat', category:'general', important:true, read:true },
]

function AnnItem({ a, onToggleRead }) {
  return (
    <div className="card" role="article" aria-label={`Anunț ${a.title}`}>
      <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
        <div className="card-title" style={{margin:0}}>
          {a.important && <AlertCircle size={18} color="#F59E0B" title="Important"/>}
          {a.title}
        </div>
        <button className="btn outline small" onClick={()=>onToggleRead(a.id)} aria-label={a.read?'Marchează necitit':'Marchează citit'}>
          {a.read ? 'Marcat ca citit' : 'Marchează citit'}
        </button>
      </div>
      <div className="small muted">{new Date(a.date).toLocaleDateString('ro-RO')} • {a.author} • {a.category}</div>
    </div>
  )
}

export default function Announcements() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('toate')
  const [items, setItems] = useState(DATA)

  const filtered = useMemo(() => items.filter(a =>
    (cat==='toate' || a.category===cat) && a.title.toLowerCase().includes(q.toLowerCase())
  ), [q, cat, items])

  return (
    <section className="fade-in">
      <h1 className="page-title">Anunțuri</h1>
      <div className="card" style={{marginTop:8}}>
        <div className="row" style={{gap:8, alignItems:'center'}}>
          <input className="input" placeholder="Caută anunțuri" value={q} onChange={e=>setQ(e.target.value)} aria-label="Caută anunțuri" />
          <select className="input" value={cat} onChange={e=>setCat(e.target.value)} aria-label="Filtru categorie">
            <option value="toate">Toate</option>
            <option value="facultate">Facultate</option>
            <option value="curs">Curs</option>
            <option value="general">General</option>
          </select>
        </div>
      </div>

      <div style={{display:'grid', gap:12, marginTop:12}}>
        {filtered.map(a => (
          <AnnItem key={a.id} a={a} onToggleRead={(id)=>setItems(prev=>prev.map(x=>x.id===id?{...x, read:!x.read}:x))} />
        ))}
      </div>
    </section>
  )
}

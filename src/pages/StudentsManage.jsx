import { useMemo, useState } from 'react'
import { Users, Save } from 'lucide-react'

const STUDENTS = [
  { id: 1, name: 'Maria Pop', faculty: 'Informatică', year: 'II', group: '241', email: 'maria.pop@univ.ro', status: 'Activ' },
  { id: 2, name: 'Ion Ionescu', faculty: 'Informatică', year: 'I', group: '142', email: 'ion.ionescu@univ.ro', status: 'Activ' },
  { id: 3, name: 'Ana Dobre', faculty: 'AC', year: 'III', group: '331', email: 'ana.dobre@univ.ro', status: 'Suspendat' },
]

export default function StudentsManage(){
  const [q, setQ] = useState('')
  const [items, setItems] = useState(STUDENTS)
  const [selId, setSelId] = useState(1)
  const [saved, setSaved] = useState(false)

  const filtered = useMemo(() => items.filter(s => (s.name + s.email + s.group).toLowerCase().includes(q.toLowerCase())), [q, items])
  const selected = items.find(s => s.id === selId) || items[0]

  const updateField = (field, value) => {
    setItems(prev => prev.map(s => s.id === selected.id ? { ...s, [field]: value } : s))
    setSaved(false)
  }

  const saveChanges = () => {
    // UI-only mock save
    setSaved(true)
    setTimeout(()=> setSaved(false), 2500)
  }

  return (
    <section className="fade-in">
      <h1 className="page-title">Gestionare studenți</h1>

      <div className="grid grid-2" style={{marginTop:8}}>
        <div className="card">
          <div className="card-title"><Users size={18}/> Caută student</div>
          <div className="row" style={{gap:8}}>
            <input className="input" placeholder="Caută după nume, email sau grupă" value={q} onChange={e=>setQ(e.target.value)} aria-label="Caută student" />
          </div>
          <div style={{marginTop:12, maxHeight:320, overflowY:'auto', display:'grid', gap:8}} aria-label="Rezultate căutare">
            {filtered.map(s => (
              <button key={s.id} className={`nav-item ${selId===s.id?'active':''}`} onClick={()=>setSelId(s.id)} style={{justifyContent:'space-between'}} aria-label={`Selectează ${s.name}`}>
                <span>
                  <strong>{s.name}</strong>
                  <div className="small muted">{s.email} • {s.faculty} — an {s.year}, grupa {s.group}</div>
                </span>
                <span className={`status ${s.status==='Activ'?'success':'warning'}`}>{s.status}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Actualizează informații academice</div>
          {selected && (
            <div style={{display:'grid', gap:12}}>
              <div className="row" style={{gap:12}}>
                <div className="field" style={{flex:1}}>
                  <label className="label" htmlFor="nume">Nume complet</label>
                  <input id="nume" className="input" value={selected.name} onChange={e=>updateField('name', e.target.value)} />
                </div>
                <div className="field" style={{flex:1}}>
                  <label className="label" htmlFor="email">Email</label>
                  <input id="email" className="input" value={selected.email} onChange={e=>updateField('email', e.target.value)} />
                </div>
              </div>
              <div className="row" style={{gap:12}}>
                <div className="field" style={{flex:1}}>
                  <label className="label" htmlFor="fac">Facultate</label>
                  <select id="fac" className="input" value={selected.faculty} onChange={e=>updateField('faculty', e.target.value)}>
                    <option>Informatică</option>
                    <option>AC</option>
                    <option>Matematică</option>
                  </select>
                </div>
                <div className="field" style={{flex:1}}>
                  <label className="label" htmlFor="an">An</label>
                  <select id="an" className="input" value={selected.year} onChange={e=>updateField('year', e.target.value)}>
                    <option>I</option>
                    <option>II</option>
                    <option>III</option>
                    <option>IV</option>
                  </select>
                </div>
                <div className="field" style={{width:120}}>
                  <label className="label" htmlFor="gr">Grupă</label>
                  <input id="gr" className="input" value={selected.group} onChange={e=>updateField('group', e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="status">Status</label>
                <select id="status" className="input" value={selected.status} onChange={e=>updateField('status', e.target.value)}>
                  <option>Activ</option>
                  <option>Suspendat</option>
                  <option>Absolvent</option>
                </select>
              </div>
              <div className="row" style={{gap:8, alignItems:'center'}}>
                <button className="btn" onClick={saveChanges}><Save size={16}/> Salvează modificările</button>
                {saved && <span className="status success">Date actualizate</span>}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

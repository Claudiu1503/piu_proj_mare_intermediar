import { useMemo, useState } from 'react'
import { CheckCircle2, FilePlus2, FolderOpen, Upload, XCircle } from 'lucide-react'

const FACULTIES = ['Informatica', 'Automatică și Calculatoare', 'Matematică', 'Litere']

export default function Admissions(){
  const [candidates, setCandidates] = useState([])
  const [q, setQ] = useState('')
  const [form, setForm] = useState({ name:'', email:'', phone:'', faculty:FACULTIES[0], docs:[], status:'incomplet' })
  const [saved, setSaved] = useState(false)

  const filtered = useMemo(()=> candidates.filter(c =>
    (c.name+c.email+c.faculty).toLowerCase().includes(q.toLowerCase())
  ), [q, candidates])

  function addCandidate(){
    if(!form.name || !form.email) return
    const it = { id: Date.now(), ...form }
    setCandidates(prev => [it, ...prev])
    setForm({ name:'', email:'', phone:'', faculty:FACULTIES[0], docs:[], status:'incomplet' })
    setSaved(true)
    setTimeout(()=>setSaved(false), 2000)
  }

  function addDoc(name){
    if(!name) return
    setForm(prev => ({...prev, docs:[...prev.docs, { id: Date.now(), name }]}))
  }

  function updateStatus(id, status){
    setCandidates(prev => prev.map(c => c.id===id?{...c, status}:c))
  }

  return (
    <section className="fade-in">
      <h1 className="page-title">Admitere — gestionarea dosarelor</h1>

      <div className="grid grid-2" style={{marginTop:8}}>
        <div className="card" role="form" aria-label="Creează dosar candidat">
          <div className="card-title"><FilePlus2 size={18}/> Dosar nou</div>
          <div className="field">
            <label className="label" htmlFor="nume">Nume complet</label>
            <input id="nume" className="input" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
          </div>
          <div className="row">
            <div className="field" style={{flex:1}}>
              <label className="label" htmlFor="email">Email</label>
              <input id="email" className="input" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
            </div>
            <div className="field" style={{flex:1}}>
              <label className="label" htmlFor="tel">Telefon</label>
              <input id="tel" className="input" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="fac">Facultate</label>
            <select id="fac" className="input" value={form.faculty} onChange={e=>setForm({...form, faculty:e.target.value})}>
              {FACULTIES.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
          <div className="field">
            <label className="label">Documente încărcate</label>
            <div style={{display:'grid', gap:8}}>
              {(form.docs||[]).map(d => (
                <div key={d.id} className="row" style={{justifyContent:'space-between'}}>
                  <span className="nav-item" style={{padding:8}}><FolderOpen size={16}/> {d.name}</span>
                </div>
              ))}
              <div className="row" style={{gap:8}}>
                <input className="input" placeholder="Ex: Diplomă bacalaureat.pdf" onKeyDown={e=>{ if(e.key==='Enter'){ addDoc(e.currentTarget.value); e.currentTarget.value='' } }} />
                <button className="btn outline" onClick={()=>{
                  const el = document.querySelector('#dummyDocName')
                }}><Upload size={16}/> Încărcare (mock)</button>
              </div>
              <div className="small muted">Introduceți numele fișierului pentru simulare și apăsați Enter.</div>
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="status">Status dosar</label>
            <select id="status" className="input" value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
              <option value="validat">Validat</option>
              <option value="incomplet">Incomplet</option>
              <option value="respins">Respins</option>
            </select>
          </div>
          <div className="row" style={{alignItems:'center', gap:8}}>
            <button className="btn" onClick={addCandidate}>Creează dosar</button>
            {saved && <span className="status success"><CheckCircle2 size={14}/> Salvat — notificare trimisă candidatului (mock)</span>}
          </div>
        </div>

        <div className="card">
          <div className="card-title"><FolderOpen size={18}/> Dosare candidați</div>
          <div className="row" style={{gap:8}}>
            <input className="input" placeholder="Caută după nume/email/facultate" value={q} onChange={e=>setQ(e.target.value)} />
          </div>
          <div style={{overflowX:'auto', marginTop:12}}>
            <table className="table" aria-label="Tabel dosare">
              <thead>
                <tr>
                  <th>Nume</th>
                  <th>Email</th>
                  <th>Facultate</th>
                  <th>Documente</th>
                  <th>Status</th>
                  <th>Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.faculty}</td>
                    <td>{(c.docs||[]).length}</td>
                    <td>
                      {c.status==='validat' && <span className="status success">Validat</span>}
                      {c.status==='incomplet' && <span className="status warning">Incomplet</span>}
                      {c.status==='respins' && <span className="status error">Respins</span>}
                    </td>
                    <td>
                      <div className="row" style={{gap:8}}>
                        <button className="btn outline" onClick={()=>updateStatus(c.id,'validat')}><CheckCircle2 size={16}/> Validează</button>
                        <button className="btn outline" onClick={()=>updateStatus(c.id,'incomplet')}><Upload size={16}/> Incomplet</button>
                        <button className="btn outline" onClick={()=>updateStatus(c.id,'respins')}><XCircle size={16}/> Respinge</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length===0 && (
                  <tr><td colSpan={6} className="small muted">Nu există dosare.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

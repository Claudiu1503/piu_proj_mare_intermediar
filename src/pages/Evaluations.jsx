import { useMemo, useState } from 'react'
import { Calendar, CheckCircle2, FileText } from 'lucide-react'

const COURSES = [
  'Algoritmi și Structuri de Date',
  'Baze de Date',
  'Rețele de Calculatoare',
  'Sisteme de Operare',
]

const TYPES = ['Test', 'Examen scris', 'Proiect']

export default function Evaluations(){
  const [course, setCourse] = useState(COURSES[0])
  const [type, setType] = useState(TYPES[0])
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('Sala B12')
  const [mode, setMode] = useState('În campus')
  const [items, setItems] = useState([])
  const [saved, setSaved] = useState(false)

  const valid = course && type && date && time && location

  const upcoming = useMemo(() => items.sort((a,b)=> (a.date+a.time).localeCompare(b.date+b.time)), [items])

  function addEvaluation(){
    if(!valid) return
    const it = { id: Date.now(), course, type, date, time, location, mode, status: 'Nou' }
    setItems(prev => [it, ...prev])
    setSaved(true)
    setTimeout(()=>setSaved(false), 2000)
  }

  return (
    <section className="fade-in">
      <h1 className="page-title">Evaluări — programare examene și teste</h1>

      <div className="grid grid-2" style={{marginTop:8}}>
        <div className="card" role="form" aria-label="Formular programare evaluare">
          <div className="card-title"><Calendar size={18}/> Setează evaluare</div>
          <div className="field">
            <label className="label" htmlFor="course">Curs</label>
            <select id="course" className="input" value={course} onChange={e=>setCourse(e.target.value)}>
              {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="row">
            <div className="field" style={{flex:1}}>
              <label className="label" htmlFor="type">Tip evaluare</label>
              <select id="type" className="input" value={type} onChange={e=>setType(e.target.value)}>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="field" style={{flex:1}}>
              <label className="label" htmlFor="mode">Mod desfășurare</label>
              <select id="mode" className="input" value={mode} onChange={e=>setMode(e.target.value)}>
                <option>În campus</option>
                <option>Online</option>
                <option>Hibrid</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="field" style={{flex:1}}>
              <label className="label" htmlFor="date">Data</label>
              <input id="date" type="date" className="input" value={date} onChange={e=>setDate(e.target.value)} />
            </div>
            <div className="field" style={{flex:1}}>
              <label className="label" htmlFor="time">Ora</label>
              <input id="time" type="time" className="input" value={time} onChange={e=>setTime(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="loc">Locație</label>
            <input id="loc" className="input" placeholder="ex: Sala B12 / Zoom" value={location} onChange={e=>setLocation(e.target.value)} />
          </div>
          <div className="row" style={{alignItems:'center', gap:8}}>
            <button className="btn" disabled={!valid} onClick={addEvaluation}>Salvează</button>
            {saved && <span className="status success"><CheckCircle2 size={14}/> Salvat — notificare trimisă studenților (mock)</span>}
          </div>
          <div className="small muted" style={{marginTop:8}}>La salvare, platforma trimite o notificare către studenții înscriși (simulat).</div>
        </div>

        <div className="card" aria-label="Evaluări programate">
          <div className="card-title"><FileText size={18}/> Evaluări programate</div>
          <div style={{overflowX:'auto'}}>
            <table className="table">
              <thead>
                <tr>
                  <th>Curs</th>
                  <th>Tip</th>
                  <th>Data</th>
                  <th>Ora</th>
                  <th>Locație</th>
                  <th>Mod</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map(e => (
                  <tr key={e.id}>
                    <td>{e.course}</td>
                    <td>{e.type}</td>
                    <td>{e.date}</td>
                    <td>{e.time}</td>
                    <td>{e.location}</td>
                    <td>{e.mode}</td>
                  </tr>
                ))}
                {upcoming.length===0 && (
                  <tr><td colSpan={6} className="small muted">Nu există evaluări programate încă.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

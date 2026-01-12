import { useMemo, useState } from 'react'
import { Calendar, Plus, Clock, Check, Trash2 } from 'lucide-react'

const DAYS = ['Luni','Marți','Miercuri','Joi','Vineri']

export default function Consultations(){
  const [day, setDay] = useState('Miercuri')
  const [start, setStart] = useState('12:00')
  const [end, setEnd] = useState('14:00')
  const [slots, setSlots] = useState([
    { id:1, day:'Miercuri', start:'12:00', end:'14:00', room:'C3', published:true, capacity:10, booked:6 },
  ])
  const [room, setRoom] = useState('C3')
  const [cap, setCap] = useState(10)
  const [saved, setSaved] = useState(false)

  const addSlot = () => {
    const id = Math.max(0, ...slots.map(s=>s.id)) + 1
    setSlots(prev => [...prev, { id, day, start, end, room, published:false, capacity: Number(cap)||0, booked:0 }])
    setSaved(true)
    setTimeout(()=>setSaved(false), 2000)
  }

  const publish = (id, v=true) => setSlots(prev => prev.map(s=> s.id===id?{...s, published:v}:s))
  const remove = (id) => setSlots(prev => prev.filter(s=>s.id!==id))

  const upcoming = useMemo(() => slots.sort((a,b)=> a.day.localeCompare(b.day) || a.start.localeCompare(b.start)), [slots])

  return (
    <section className="fade-in">
      <h1 className="page-title">Consultații / Întâlniri</h1>

      <div className="grid grid-2" style={{marginTop:8}}>
        <div className="card">
          <div className="card-title"><Calendar size={18}/> Adaugă interval disponibil</div>
          <div className="row" style={{gap:12}}>
            <div className="field" style={{flex:1}}>
              <label className="label" htmlFor="zi">Ziua</label>
              <select id="zi" className="input" value={day} onChange={e=>setDay(e.target.value)}>
                {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="field" style={{width:140}}>
              <label className="label" htmlFor="start">Început</label>
              <input id="start" type="time" className="input" value={start} onChange={e=>setStart(e.target.value)} />
            </div>
            <div className="field" style={{width:140}}>
              <label className="label" htmlFor="end">Sfârșit</label>
              <input id="end" type="time" className="input" value={end} onChange={e=>setEnd(e.target.value)} />
            </div>
          </div>
          <div className="row" style={{gap:12, marginTop:8}}>
            <div className="field" style={{width:120}}>
              <label className="label" htmlFor="sala">Sala</label>
              <input id="sala" className="input" value={room} onChange={e=>setRoom(e.target.value)} />
            </div>
            <div className="field" style={{width:160}}>
              <label className="label" htmlFor="cap">Capacitate</label>
              <input id="cap" type="number" min={1} className="input" value={cap} onChange={e=>setCap(e.target.value)} />
            </div>
          </div>
          <div className="row" style={{gap:8, alignItems:'center', marginTop:8}}>
            <button className="btn" onClick={addSlot}><Plus size={16}/> Adaugă interval</button>
            {saved && <span className="status success">Interval adăugat</span>}
          </div>
        </div>

        <div className="card">
          <div className="card-title"><Clock size={18}/> Intervalele mele</div>
          <div style={{overflowX:'auto'}}>
            <table className="table" aria-label="Lista intervale consultații">
              <thead>
                <tr>
                  <th>Zi</th>
                  <th>Interval</th>
                  <th>Sala</th>
                  <th>Locuri</th>
                  <th>Status</th>
                  <th>Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map(s => (
                  <tr key={s.id}>
                    <td>{s.day}</td>
                    <td>{s.start} — {s.end}</td>
                    <td>{s.room}</td>
                    <td>{s.booked}/{s.capacity}</td>
                    <td>
                      <span className={`status ${s.published?'success':'warning'}`}>{s.published?'Publicat':'Ciornă'}</span>
                    </td>
                    <td>
                      <div className="row" style={{gap:8}}>
                        {s.published ? (
                          <button className="btn outline" onClick={()=>publish(s.id, false)}>Anulează</button>
                        ) : (
                          <button className="btn" onClick={()=>publish(s.id, true)}><Check size={16}/> Publică</button>
                        )}
                        <button className="btn outline" onClick={()=>remove(s.id)} title="Șterge"><Trash2 size={16}/> Șterge</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card" style={{marginTop:12}}>
        <div className="card-title">Rezervări (exemplu pentru studenți)</div>
        <div className="small muted">Vizualizare mock: studenții pot rezerva locuri când intervalul este publicat.</div>
        <div style={{display:'grid', gap:10, marginTop:8}}>
          {slots.filter(s=>s.published).map(s => (
            <div key={`r-${s.id}`} className="row" style={{justifyContent:'space-between', borderBottom:'1px solid var(--border)', paddingBottom:8}}>
              <div>
                <strong>{s.day} {s.start}—{s.end}</strong> • Sala {s.room}
                <div className="small muted">{s.booked}/{s.capacity} locuri ocupate</div>
              </div>
              <button className="btn outline" disabled>Rezervă loc (mock)</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { FileText, Upload } from 'lucide-react'

const HISTORY = [
  { id:1, type:'Adeverință student', date:'2025-11-01', status:'Trimis' },
  { id:2, type:'Foaie matricolă', date:'2025-10-15', status:'Aprobat' },
]

export default function Requests() {
  const [type, setType] = useState('adeverinta')
  const [message, setMessage] = useState('')

  return (
    <section className="fade-in">
      <h1 className="page-title">Cereri administrative</h1>

      <div className="grid grid-2" style={{marginTop:8}}>
        <div className="card">
          <div className="card-title"><FileText size={18}/> Trimite o cerere</div>
          <div className="field">
            <label className="label" htmlFor="tip">Tip cerere</label>
            <select id="tip" className="input" value={type} onChange={e=>setType(e.target.value)}>
              <option value="adeverinta">Adeverință</option>
              <option value="foaie">Foaie matricolă</option>
              <option value="actualizare">Actualizare date</option>
            </select>
          </div>
          <div className="field">
            <label className="label" htmlFor="msg">Mesaj</label>
            <textarea id="msg" className="input" rows={4} placeholder="Detaliază solicitarea" value={message} onChange={e=>setMessage(e.target.value)}></textarea>
          </div>
          <div className="row" style={{alignItems:'center', gap:8}}>
            <button className="btn outline"><Upload size={16}/> Atașamente</button>
            <button className="btn">Trimite cerere</button>
          </div>
        </div>

        <div className="card">
          <div className="card-title"><FileText size={18}/> Istoric cereri</div>
          <div style={{display:'grid', gap:8}}>
            {HISTORY.map(h => (
              <div key={h.id} className="row" style={{justifyContent:'space-between', borderBottom:'1px solid var(--border)', paddingBottom:8}}>
                <div>
                  <div><strong>{h.type}</strong></div>
                  <div className="small muted">{new Date(h.date).toLocaleDateString('ro-RO')}</div>
                </div>
                <span className={`status ${h.status==='Aprobat'?'success':'warning'}`}>{h.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

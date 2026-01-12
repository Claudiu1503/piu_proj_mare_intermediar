import { useState } from 'react'
import { Calendar, Download, Printer } from 'lucide-react'

const days = ['Luni','Marți','Miercuri','Joi','Vineri']
const hours = ['08:00','10:00','12:00','14:00','16:00']
const sample = {
  'Luni': [{ time:'08:00', name:'Analiză' }, { time:'12:00', name:'Programare' }],
  'Marți': [{ time:'10:00', name:'Baze de Date' }],
  'Miercuri': [{ time:'08:00', name:'Rețele' }],
  'Joi': [{ time:'14:00', name:'Algoritmi' }],
  'Vineri': [{ time:'12:00', name:'SO' }],
}

export default function Schedule() {
  const [view, setView] = useState('week')
  const [activeDay, setActiveDay] = useState('Luni')

  return (
    <section className="fade-in">
      <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
        <h1 className="page-title">Orar</h1>
        <div className="row">
          <div className="row" role="tablist" aria-label="Mod vizualizare">
            <button className={`btn outline ${view==='week'?'active':''}`} role="tab" onClick={()=>setView('week')}>Săptămână</button>
            <button className={`btn outline ${view==='day'?'active':''}`} role="tab" onClick={()=>setView('day')}>Zi</button>
          </div>
          <button className="btn outline" style={{marginLeft:8}}><Download size={16}/> Export</button>
          <button className="btn outline" style={{marginLeft:8}}><Printer size={16}/> Printare</button>
        </div>
      </div>

      {view==='week' ? (
        <div className="card" style={{overflowX:'auto', marginTop:12}}>
          <div className="grid" style={{gridTemplateColumns:'120px repeat(5, 1fr)', alignItems:'stretch', gap:0}}>
            <div></div>
            {days.map(d => <div key={d} className="small muted" style={{padding:12, borderBottom:'1px solid var(--border)'}}>{d}</div>)}
            {hours.map(h => (
              <>
                <div key={h} className="small muted" style={{padding:12, borderRight:'1px solid var(--border)'}}>{h}</div>
                {days.map(d => (
                  <div key={`${d}-${h}`} style={{borderBottom:'1px dashed var(--border)', padding:8, minHeight:60}}>
                    {sample[d].find(x=>x.time===h) && (
                      <div className="status" style={{display:'inline-flex', background:'rgba(22,93,255,.1)', borderColor:'rgba(22,93,255,.4)'}}>
                        <Calendar size={14}/> {sample[d].find(x=>x.time===h).name}
                      </div>
                    )}
                  </div>
                ))}
              </>
            ))}
          </div>
        </div>
      ) : (
        <div className="card" style={{marginTop:12}}>
          <div className="row" style={{gap:8, marginBottom:12}}>
            {days.map(d => (
              <button key={d} className={`btn outline ${activeDay===d?'active':''}`} onClick={()=>setActiveDay(d)}>{d}</button>
            ))}
          </div>
          <div>
            {(sample[activeDay]||[]).map((e,i)=>(
              <div key={i} className="row" style={{justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--border)'}}>
                <div><strong>{e.time}</strong> — {e.name}</div>
                <span className="status">Sala B12</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

import { useState } from 'react'
import { ArrowUpDown, Award, CheckCircle2, Info } from 'lucide-react'

const DATA = [
  { course: 'Algoritmi', grade: 9.5, absences: 0, status: 'promovat' },
  { course: 'Baze de date', grade: 8.7, absences: 1, status: 'promovat' },
  { course: 'Rețele', grade: 4.8, absences: 3, status: 'restanță' },
  { course: 'SO', grade: 6.0, absences: 0, status: 'evaluare' },
]

function Status({ s }) {
  const map = {
    promovat: { text: 'Promovat', cls: 'success', icon: <CheckCircle2 size={14}/> },
    restanță: { text: 'Restanță', cls: 'error', icon: <Info size={14}/> },
    evaluare: { text: 'Evaluare în curs', cls: 'warning', icon: <Info size={14}/> },
  }
  const it = map[s] || map['evaluare']
  return <span className={`status ${it.cls}`}>{it.icon} {it.text}</span>
}

export default function Grades() {
  const [sort, setSort] = useState('course')
  const sorted = [...DATA].sort((a,b)=>{
    if (sort==='course') return a.course.localeCompare(b.course)
    if (sort==='grade') return b.grade - a.grade
    if (sort==='absences') return b.absences - a.absences
    return 0
  })

  const avg = (DATA.reduce((s,c)=>s+c.grade,0)/DATA.length).toFixed(2)

  return (
    <section className="fade-in">
      <h1 className="page-title">Note și rezultate</h1>
      <div className="card" style={{marginTop:8}}>
        <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
          <div className="row" style={{gap:8}}>
            <button className="btn outline" onClick={()=>setSort('course')}><ArrowUpDown size={16}/> Sortează după curs</button>
            <button className="btn outline" onClick={()=>setSort('grade')}><ArrowUpDown size={16}/> Sortează după notă</button>
            <button className="btn outline" onClick={()=>setSort('absences')}><ArrowUpDown size={16}/> Sortează după absențe</button>
          </div>
          <div className="row" style={{alignItems:'center', gap:8}}>
            <Award size={18} color="#1CC8A0"/>
            <div className="small">Media curentă</div>
            <strong>{avg}</strong>
          </div>
        </div>
        <div style={{marginTop:12, overflowX:'auto'}}>
          <table className="table" role="table" aria-label="Tabel note">
            <thead>
              <tr>
                <th>Curs</th>
                <th>Notă</th>
                <th>Absențe</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r,i)=> (
                <tr key={i}>
                  <td>{r.course}</td>
                  <td><strong>{r.grade.toFixed(2)}</strong></td>
                  <td>{r.absences}</td>
                  <td><Status s={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{marginTop:12}}>
          <div className="small muted">Progres academic</div>
          <div className="progress"><span style={{width: `${Math.min(100, avg*10)}%`}}/></div>
        </div>
      </div>
    </section>
  )
}

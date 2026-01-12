import { useMemo, useState } from 'react'
import { BookOpen, Filter, Upload, Users } from 'lucide-react'

const MOCK = [
  { id: 1, name: 'Algoritmi și Structuri de Date', teacher: 'Prof. Ionescu', time: 'Luni 10:00', progress: 70 },
  { id: 2, name: 'Baze de Date', teacher: 'Conf. Popa', time: 'Marți 12:00', progress: 40 },
  { id: 3, name: 'Rețele de Calculatoare', teacher: 'Dr. Dobre', time: 'Miercuri 8:00', progress: 55 },
  { id: 4, name: 'Sisteme de Operare', teacher: 'Prof. Marin', time: 'Joi 14:00', progress: 20 },
  { id: 5, name: 'Ingineria Programării', teacher: 'Lect. Tudor', time: 'Vineri 12:00', progress: 85 },
]

function CourseCard({ c, isProfessor=false }) {
  return (
    <div className="card" role="article" aria-label={`Curs ${c.name}`}>
      <div className="card-title"><BookOpen size={18} /> {c.name}</div>
      <div className="muted small">{c.teacher} • {c.time}</div>
      <div style={{marginTop:12}} className="row">
        <button className="btn outline">Materiale</button>
        <button className="btn outline">Teme</button>
        <button className="btn outline">Prezență</button>
        <button className="btn outline">Evaluări</button>
      </div>
      <div style={{marginTop:12}}>
        {isProfessor ? (
          <div className="row">
            <button className="btn"><Upload size={16}/> Adaugă material</button>
            <button className="btn outline"><Users size={16}/> Evaluează studenți</button>
          </div>
        ) : (
          <div>
            <div className="small muted">Progres teme</div>
            <div className="progress" aria-label="Progres teme"><span style={{width: `${c.progress}%`}} /></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Courses() {
  const [q, setQ] = useState('')
  const [role, setRole] = useState('student')
  const filtered = useMemo(() => MOCK.filter(c => c.name.toLowerCase().includes(q.toLowerCase())), [q])

  return (
    <section className="fade-in">
      <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
        <h1 className="page-title">Cursurile mele</h1>
        <div className="row" role="group" aria-label="Rol vizual">
          <button className={`btn outline ${role==='student'?'active':''}`} onClick={()=>setRole('student')}>Student</button>
          <button className={`btn outline ${role==='profesor'?'active':''}`} onClick={()=>setRole('profesor')}>Profesor</button>
        </div>
      </div>

      <div className="row" style={{marginTop:8, alignItems:'center', justifyContent:'space-between'}}>
        <div className="row" style={{flex:1, gap:8}}>
          <div className="field" style={{flex:1}}>
            <label className="visually-hidden" htmlFor="search">Caută curs</label>
            <input id="search" className="input" placeholder="Caută după nume de curs" value={q} onChange={e=>setQ(e.target.value)} aria-label="Caută după nume de curs" />
          </div>
          <button className="btn outline" aria-label="Filtre">
            <Filter size={16} /> Filtre
          </button>
        </div>
      </div>

      <div className="grid grid-3" style={{marginTop:16}}>
        {filtered.map(c => (
          <CourseCard key={c.id} c={c} isProfessor={role==='profesor'} />
        ))}
      </div>
    </section>
  )
}

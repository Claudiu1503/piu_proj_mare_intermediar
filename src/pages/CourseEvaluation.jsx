import { useMemo, useState } from 'react'
import { ClipboardList, Save, CheckCircle2 } from 'lucide-react'

const COURSES = ['Algoritmi', 'Baze de date', 'Rețele', 'SO']
const GROUPS = ['241', '242', '331']

const STUDENTS = [
  { id:1, name:'Maria Pop', grade:'', feedback:'' },
  { id:2, name:'Ion Ionescu', grade:'', feedback:'' },
  { id:3, name:'Ana Dobre', grade:'', feedback:'' },
]

export default function CourseEvaluation(){
  const [course, setCourse] = useState('Algoritmi')
  const [group, setGroup] = useState('241')
  const [rows, setRows] = useState(STUDENTS)
  const [saved, setSaved] = useState(false)
  const [published, setPublished] = useState(false)

  const updateRow = (id, field, value) => setRows(prev => prev.map(r => r.id===id ? { ...r, [field]: value } : r))

  const save = () => { setSaved(true); setPublished(false); setTimeout(()=>setSaved(false), 2000) }
  const publish = () => { setPublished(true); setSaved(false); setTimeout(()=>setPublished(false), 2500) }

  const completion = useMemo(()=> {
    const total = rows.length
    const filled = rows.filter(r => r.grade !== '').length
    return Math.round((filled/Math.max(1,total))*100)
  }, [rows])

  return (
    <section className="fade-in">
      <h1 className="page-title">Evaluare curs</h1>

      <div className="card" style={{marginTop:8}}>
        <div className="row" style={{gap:12, alignItems:'flex-end'}}>
          <div className="field" style={{minWidth:220}}>
            <label className="label" htmlFor="disc">Disciplina</label>
            <select id="disc" className="input" value={course} onChange={e=>setCourse(e.target.value)}>
              {COURSES.map(c=> <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="field" style={{minWidth:160}}>
            <label className="label" htmlFor="grupa">Grupa</label>
            <select id="grupa" className="input" value={group} onChange={e=>setGroup(e.target.value)}>
              {GROUPS.map(g=> <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div className="row" style={{gap:8}}>
            <button className="btn" onClick={save}><Save size={16}/> Salvează</button>
            <button className="btn outline" onClick={publish}><ClipboardList size={16}/> Publică rezultatele</button>
            {saved && <span className="status success">Date salvate</span>}
            {published && <span className="status success">Rezultate publicate</span>}
          </div>
        </div>
        <div style={{marginTop:12}}>
          <div className="small muted">Completare evaluare</div>
          <div className="progress"><span style={{width:`${completion}%`}}/></div>
        </div>
      </div>

      <div className="card" style={{marginTop:12}}>
        <table className="table" aria-label="Evaluare studenți">
          <thead>
            <tr>
              <th>Student</th>
              <th style={{width:120}}>Notă</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>
                  <input className="input" placeholder="0 - 10" value={r.grade} onChange={e=>updateRow(r.id,'grade', e.target.value)} aria-label={`Notă pentru ${r.name}`} />
                </td>
                <td>
                  <input className="input" placeholder="Comentariu scurt" value={r.feedback} onChange={e=>updateRow(r.id,'feedback', e.target.value)} aria-label={`Feedback pentru ${r.name}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

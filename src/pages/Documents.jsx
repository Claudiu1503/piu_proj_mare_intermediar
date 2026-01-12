import { useMemo, useState } from 'react'
import { FileText, Filter, Search } from 'lucide-react'

const DOCS = [
  { id:1, faculty:'Informatica', year:'I', type:'Adeverință', requester:'Maria Pop', status:'Nouă' },
  { id:2, faculty:'Informatica', year:'II', type:'Foaie matricolă', requester:'Ion Ionescu', status:'În lucru' },
  { id:3, faculty:'AC', year:'III', type:'Actualizare date', requester:'Ana D.', status:'Finalizată' },
]

export default function Documents(){
  const [q, setQ] = useState('')
  const [fac, setFac] = useState('toate')
  const [yr, setYr] = useState('toți')
  const [tp, setTp] = useState('toate')

  const filtered = useMemo(()=> DOCS.filter(d =>
    (fac==='toate'||d.faculty===fac) && (yr==='toți'||d.year===yr) && (tp==='toate'||d.type===tp) &&
    (d.type+d.requester).toLowerCase().includes(q.toLowerCase())
  ), [q, fac, yr, tp])

  return (
    <section className="fade-in">
      <h1 className="page-title">Documente / Secretariat</h1>
      <div className="card" style={{marginTop:8}}>
        <div className="row" style={{gap:8, alignItems:'center'}}>
          <input className="input" placeholder="Caută după solicitant sau tip" value={q} onChange={e=>setQ(e.target.value)} aria-label="Caută documente" />
          <select className="input" value={fac} onChange={e=>setFac(e.target.value)}>
            <option value="toate">Toate facultățile</option>
            <option>Informatica</option>
            <option>AC</option>
          </select>
          <select className="input" value={yr} onChange={e=>setYr(e.target.value)}>
            <option value="toți">Toți anii</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
          </select>
          <select className="input" value={tp} onChange={e=>setTp(e.target.value)}>
            <option value="toate">Toate tipurile</option>
            <option>Adeverință</option>
            <option>Foaie matricolă</option>
            <option>Actualizare date</option>
          </select>
        </div>
      </div>

      <div className="card" style={{marginTop:12}}>
        <table className="table" aria-label="Tabel cereri primite">
          <thead>
            <tr>
              <th>Solicitant</th>
              <th>Facultate</th>
              <th>An</th>
              <th>Tip cerere</th>
              <th>Status</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(d => (
              <tr key={d.id}>
                <td>{d.requester}</td>
                <td>{d.faculty}</td>
                <td>{d.year}</td>
                <td>{d.type}</td>
                <td><span className={`status ${d.status==='Finalizată'?'success': d.status==='Nouă'?'warning':''}`}>{d.status}</span></td>
                <td>
                  <div className="row" style={{gap:8}}>
                    <button className="btn outline">Procesează</button>
                    <button className="btn">Generează document</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

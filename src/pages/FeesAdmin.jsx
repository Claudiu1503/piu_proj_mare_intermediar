import { useMemo, useState } from 'react'
import { CheckCircle2, FileText, Search } from 'lucide-react'

const MOCK_STUDENTS = [
  { id:1, name:'Maria Pop', code:'S1234', payments:[{ id:11, date:'2025-10-01', type:'Taxă școlarizare - sem. I', amount:1500, method:'Card', status:'Confirmată'}] },
  { id:2, name:'Ion Ionescu', code:'S2345', payments:[{ id:21, date:'2025-09-15', type:'Cămin - octombrie', amount:300, method:'Transfer', status:'Confirmată'}] },
]

export default function FeesAdmin(){
  const [q, setQ] = useState('')
  const [list, setList] = useState(MOCK_STUDENTS)
  const [selected, setSelected] = useState(null)
  const [type, setType] = useState('Taxă școlarizare - sem. I')
  const [amount, setAmount] = useState(0)
  const [method, setMethod] = useState('Card')
  const [saved, setSaved] = useState(false)

  const filtered = useMemo(()=> list.filter(s =>
    (s.name+s.code).toLowerCase().includes(q.toLowerCase())
  ), [q, list])

  function addPayment(){
    if(!selected || !type || !amount) return
    const pid = Date.now()
    const pay = { id:pid, date: new Date().toISOString().slice(0,10), type, amount: Number(amount), method, status:'Confirmată' }
    setList(prev => prev.map(s => s.id===selected.id ? { ...s, payments:[pay, ...(s.payments||[])] } : s))
    setSaved(true)
    setTimeout(()=>setSaved(false), 2000)
  }

  return (
    <section className="fade-in">
      <h1 className="page-title">Situație taxe — gestionare plăți (Secretariat)</h1>

      <div className="grid grid-2" style={{marginTop:8}}>
        <div className="card">
          <div className="card-title"><Search size={18}/> Caută student</div>
          <div className="row" style={{gap:8}}>
            <input className="input" placeholder="Nume sau cod matricol" value={q} onChange={e=>setQ(e.target.value)} aria-label="Căutare" />
          </div>
          <div style={{marginTop:12, display:'grid', gap:8}} aria-label="Rezultate căutare">
            {filtered.map(s => (
              <button key={s.id} className={`nav-item ${selected?.id===s.id?'active':''}`} onClick={()=>setSelected(s)}>
                <span><strong>{s.name}</strong> — <span className="small muted">{s.code}</span></span>
              </button>
            ))}
            {filtered.length===0 && <div className="small muted">Niciun rezultat.</div>}
          </div>
        </div>

        <div className="card" aria-live="polite">
          <div className="card-title"><FileText size={18}/> Detalii și tranzacții</div>
          {!selected ? (
            <div className="small muted">Selectează un student pentru a vedea istoricul și a înregistra plăți.</div>
          ) : (
            <div style={{display:'grid', gap:12}}>
              <div><strong>{selected.name}</strong> • <span className="small muted">{selected.code}</span></div>
              <div className="row">
                <div className="field" style={{flex:2}}>
                  <label className="label" htmlFor="ptype">Tip plată</label>
                  <input id="ptype" className="input" value={type} onChange={e=>setType(e.target.value)} placeholder="ex: Taxă școlarizare - sem. I" />
                </div>
                <div className="field" style={{flex:1}}>
                  <label className="label" htmlFor="amount">Sumă (RON)</label>
                  <input id="amount" className="input" type="number" min={0} value={amount} onChange={e=>setAmount(e.target.value)} />
                </div>
                <div className="field" style={{flex:1}}>
                  <label className="label" htmlFor="method">Metodă</label>
                  <select id="method" className="input" value={method} onChange={e=>setMethod(e.target.value)}>
                    <option>Card</option>
                    <option>Transfer online</option>
                    <option>Cash</option>
                  </select>
                </div>
              </div>
              <div className="row" style={{alignItems:'center', gap:8}}>
                <button className="btn" onClick={addPayment}>Înregistrează / Confirmă plata</button>
                {saved && <span className="status success"><CheckCircle2 size={14}/> Salvat — chitanță electronică emisă (mock)</span>}
              </div>

              <div className="sep" />
              <div className="small muted">Tranzacții recente</div>
              <div style={{overflowX:'auto'}}>
                <table className="table" aria-label="Tabel plăți">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Tip</th>
                      <th>Sumă</th>
                      <th>Metodă</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selected.payments||[]).map(p => (
                      <tr key={p.id}>
                        <td>{new Date(p.date).toLocaleDateString('ro-RO')}</td>
                        <td>{p.type}</td>
                        <td>{p.amount.toFixed(2)} RON</td>
                        <td>{p.method}</td>
                        <td><span className="status success">{p.status}</span></td>
                      </tr>
                    ))}
                    {(!selected.payments || selected.payments.length===0) && (
                      <tr><td colSpan={5} className="small muted">Nu există plăți înregistrate.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

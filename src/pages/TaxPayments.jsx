import { useMemo, useState } from 'react'
import { CheckCircle2, CreditCard, Download } from 'lucide-react'

const DUES = [
  { id:1, name:'Taxă școlarizare — semestrul I', amount:1500, due:'2025-11-30' },
  { id:2, name:'Reexaminare — Algoritmi', amount:100, due:'2025-12-10' },
  { id:3, name:'Cămin — noiembrie', amount:300, due:'2025-11-05' },
]

export default function TaxPayments(){
  const [items, setItems] = useState(DUES)
  const [selected, setSelected] = useState(null)
  const [method, setMethod] = useState('Card bancar')
  const [card, setCard] = useState({ number:'', name:'', exp:'', cvv:'' })
  const [confirmed, setConfirmed] = useState(false)

  const totalDue = useMemo(()=> items.reduce((s,i)=> s + (i.paid?0:i.amount), 0), [items])

  function pay(){
    if(!selected) return
    // mock: mark item as paid
    setItems(prev => prev.map(i => i.id===selected.id ? { ...i, paid:true, receiptId: 'CHT-'+Date.now() } : i))
    setConfirmed(true)
    setTimeout(()=>setConfirmed(false), 2500)
  }

  return (
    <section className="fade-in">
      <h1 className="page-title">Taxe și plăți (Student)</h1>

      <div className="grid grid-2" style={{marginTop:8}}>
        <div className="card">
          <div className="card-title"><CreditCard size={18}/> Situație plăți</div>
          <div style={{overflowX:'auto'}}>
            <table className="table" aria-label="Tabel taxe datorate">
              <thead>
                <tr>
                  <th>Taxă</th>
                  <th>Scadență</th>
                  <th>Suma</th>
                  <th>Status</th>
                  <th>Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {items.map(i => (
                  <tr key={i.id}>
                    <td>{i.name}</td>
                    <td>{new Date(i.due).toLocaleDateString('ro-RO')}</td>
                    <td>{i.amount.toFixed(2)} RON</td>
                    <td>{i.paid ? <span className="status success">Plătită</span> : <span className="status warning">Datorată</span>}</td>
                    <td>
                      {!i.paid ? (
                        <button className={`btn outline ${selected?.id===i.id?'active':''}`} onClick={()=>setSelected(i)}>Selectează pentru plată</button>
                      ) : (
                        <button className="btn outline"><Download size={16}/> Chitanță</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row" style={{justifyContent:'space-between', marginTop:12}}>
            <div className="small muted">Total datorat</div>
            <strong>{totalDue.toFixed(2)} RON</strong>
          </div>
        </div>

        <div className="card" aria-live="polite">
          <div className="card-title"><CreditCard size={18}/> Efectuează plata</div>
          {!selected ? (
            <div className="small muted">Alege o taxă din listă pentru a continua plata.</div>
          ) : (
            <div style={{display:'grid', gap:12}}>
              <div><strong>{selected.name}</strong> — {selected.amount.toFixed(2)} RON</div>
              <div className="field">
                <label className="label" htmlFor="method">Metodă de plată</label>
                <select id="method" className="input" value={method} onChange={e=>setMethod(e.target.value)}>
                  <option>Card bancar</option>
                  <option>Transfer online</option>
                </select>
              </div>

              {method==='Card bancar' ? (
                <div style={{display:'grid', gap:12}} aria-label="Formular card">
                  <div className="field">
                    <label className="label" htmlFor="cardno">Număr card</label>
                    <input id="cardno" className="input" placeholder="1234 5678 9012 3456" value={card.number} onChange={e=>setCard({...card, number:e.target.value})} />
                  </div>
                  <div className="row">
                    <div className="field" style={{flex:2}}>
                      <label className="label" htmlFor="name">Nume pe card</label>
                      <input id="name" className="input" placeholder="Nume Prenume" value={card.name} onChange={e=>setCard({...card, name:e.target.value})} />
                    </div>
                    <div className="field" style={{flex:1}}>
                      <label className="label" htmlFor="exp">Expirare</label>
                      <input id="exp" className="input" placeholder="MM/AA" value={card.exp} onChange={e=>setCard({...card, exp:e.target.value})} />
                    </div>
                    <div className="field" style={{flex:1}}>
                      <label className="label" htmlFor="cvv">CVV</label>
                      <input id="cvv" className="input" placeholder="***" value={card.cvv} onChange={e=>setCard({...card, cvv:e.target.value})} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="field">
                  <label className="label" htmlFor="iban">Date transfer</label>
                  <input id="iban" className="input" placeholder="ROxx XXXX XXXX XXXX" />
                </div>
              )}

              <div className="row" style={{alignItems:'center', gap:8}}>
                <button className="btn" onClick={pay}>Confirmă plata</button>
                {confirmed && <span className="status success"><CheckCircle2 size={14}/> Plata confirmată — situația financiară a fost actualizată (mock).</span>}
              </div>
              <button className="btn outline" disabled={!selected?.paid}><Download size={16}/> Descarcă chitanța</button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

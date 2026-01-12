import { Link } from 'react-router-dom'

export default function Login(){
  return (
    <div style={{minHeight:'100vh', display:'grid', placeItems:'center', background:
      "linear-gradient(0deg, rgba(11,17,32,.6), rgba(11,17,32,.6)), url('https://images.unsplash.com/photo-1460518451285-97b6aa326961?q=80&w=1600&auto=format&fit=crop') center/cover no-repeat"}}>
      <div className="card" style={{width:'min(480px, 92vw)', padding:'32px', backdropFilter:'blur(4px)'}}>
        <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:12}}>
          <div className="brand-logo" aria-hidden>PIU</div>
          <div>
            <div style={{fontWeight:700}}>PIU – Intranet Universitar</div>
            <div className="small muted">Autentificare</div>
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="email">Email instituțional</label>
          <input id="email" className="input" placeholder="prenume.nume@univ.ro" />
        </div>
        <div className="field">
          <label className="label" htmlFor="pass">Parolă</label>
          <input id="pass" type="password" className="input" placeholder="••••••••" />
        </div>
        <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
          <label className="small"><input type="checkbox" /> Ține-mă minte</label>
          <a className="small" href="#">Ai uitat parola?</a>
        </div>
        <Link to="/" className="btn" style={{display:'inline-flex', marginTop:12, textDecoration:'none', justifyContent:'center'}}>Intră în platformă</Link>
        <div className="small muted" style={{marginTop:8}}>Accesul este permis doar membrilor universității.</div>
      </div>
    </div>
  )
}

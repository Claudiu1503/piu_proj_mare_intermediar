import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <section className="fade-in center" style={{minHeight:'60vh', textAlign:'center'}}>
      <div>
        <div className="brand-logo" aria-hidden style={{margin:'0 auto 10px', width:48, height:48, fontSize:14, display:'grid', placeItems:'center'}}>404</div>
        <h1 className="page-title">Pagina nu a fost găsită</h1>
        <p className="muted">Ne pare rău, pagina căutată nu există sau a fost mutată.</p>
        <Link to="/" className="btn" style={{textDecoration:'none', display:'inline-flex', marginTop:12}}>Înapoi la Acasă</Link>
      </div>
    </section>
  )
}

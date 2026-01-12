import { useState } from 'react'
import { BookOpen, Calendar, CheckCircle2, FileText, Mail, Download } from 'lucide-react'

function Card({ title, icon, children, actions }) {
  return (
    <div className="card">
      <div className="card-title">{icon}{title}</div>
      <div style={{display:'grid', gap:12}}>
        {children}
      </div>
      {actions && <div className="card-actions" style={{marginTop:12}}>{actions}</div>}
    </div>
  )
}

export default function Dashboard() {
  const [role, setRole] = useState('student')

  return (
    <div className="fade-in" aria-labelledby="dash-title">
      <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
        <h1 id="dash-title" className="page-title">Bun venit în PIU</h1>
        <div className="row" aria-label="Selectează rolul vizual" role="group">
          <button className={`btn outline ${role==='student'?'active':''}`} onClick={()=>setRole('student')}>Student</button>
          <button className={`btn outline ${role==='profesor'?'active':''}`} onClick={()=>setRole('profesor')}>Profesor</button>
          <button className={`btn outline ${role==='secretariat'?'active':''}`} onClick={()=>setRole('secretariat')}>Secretariat</button>
        </div>
      </div>

      {role==='student' && (
        <div className="grid grid-3" style={{marginTop:16}}>
          <Card title="Orar zilnic" icon={<Calendar size={18}/>}
            actions={<>
              <button className="btn">Vezi detalii</button>
            </>}
          >
            <div className="row" style={{justifyContent:'space-between'}}>
              <div>
                <div><strong>08:00</strong> - Analiză Matematică (A1)</div>
                <div className="muted small">Prof. Ionescu • sala B12</div>
              </div>
              <span className="status success">Astăzi</span>
            </div>
            <div className="sep" />
            <div><strong>10:00</strong> - Programare (Laborator)</div>
            <div className="sep" />
            <div><strong>14:00</strong> - Algoritmi (Curs)</div>
          </Card>

          <Card title="Ultimele anunțuri" icon={<FileText size={18}/>}
            actions={<button className="btn outline">Toate anunțurile</button>}
          >
            <div><strong>Programare examen</strong> - 20 decembrie</div>
            <div className="muted small">acum 3h • Facultatea de Informatică</div>
            <div className="sep" />
            <div><strong>Laborator reprogramat</strong> - Săptămâna viitoare</div>
          </Card>

          <Card title="Note recente" icon={<CheckCircle2 size={18}/>}
            actions={<button className="btn outline">Vezi catalog</button>}
          >
            <div className="row" style={{justifyContent:'space-between'}}>
              <div>Algoritmi</div><strong>9.50</strong>
            </div>
            <div className="row" style={{justifyContent:'space-between'}}>
              <div>Baze de date</div><strong>8.70</strong>
            </div>
          </Card>

          <Card title="Cereri în curs" icon={<FileText size={18}/>}
            actions={<button className="btn">Trimite cerere</button>}
          >
            <div className="row" style={{justifyContent:'space-between'}}>
              <div>Adeverință student</div>
              <span className="status warning">În procesare</span>
            </div>
            <div className="row" style={{justifyContent:'space-between'}}>
              <div>Foaie matricolă</div>
              <span className="status success">Aprobat</span>
            </div>
          </Card>

          <Card title="Mesaje primite" icon={<Mail size={18}/>}
            actions={<button className="btn outline">Deschide mesaje</button>}
          >
            <div><strong>Prof. Ionescu</strong>: „Vă rog să consultați materialele...”</div>
            <div className="muted small">acum 1h</div>
          </Card>

          <Card title="Materiale utile" icon={<BookOpen size={18}/>}
            actions={<button className="btn"><Download size={16}/> Descarcă</button>}
          >
            <div>Structuri de date - curs 5.pdf</div>
            <div>Administrare Linux - notițe.docx</div>
          </Card>
        </div>
      )}

      {role==='profesor' && (
        <div className="grid grid-3" style={{marginTop:16}}>
          <Card title="Cursuri curente" icon={<BookOpen size={18}/>}
            actions={<button className="btn">Gestionează</button>}>
            <div>Algoritmi • 120 studenți</div>
            <div>Baze de date • 90 studenți</div>
          </Card>
          <Card title="Program consultații" icon={<Calendar size={18}/>}
            actions={<button className="btn outline">Editează</button>}>
            <div>Miercuri, 12:00 - 14:00 • sala C3</div>
          </Card>
          <Card title="Evaluări recente" icon={<CheckCircle2 size={18}/>}
            actions={<button className="btn outline">Vezi catalog</button>}>
            <div>Algoritmi • 35 lucrări corectate</div>
          </Card>
        </div>
      )}

      {role==='secretariat' && (
        <div className="grid grid-3" style={{marginTop:16}}>
          <Card title="Cereri noi" icon={<FileText size={18}/>}
            actions={<button className="btn">Procesează</button>}>
            <div>12 cereri neprocesate</div>
          </Card>
          <Card title="Documente generate" icon={<FileText size={18}/>}
            actions={<button className="btn outline">Descarcă rapoarte</button>}>
            <div>4 documente noi astăzi</div>
          </Card>
          <Card title="Rapoarte rapide" icon={<CheckCircle2 size={18}/>}
            actions={<button className="btn outline">Vezi</button>}>
            <div>Statistici săptămânale</div>
          </Card>
        </div>
      )}
    </div>
  )
}

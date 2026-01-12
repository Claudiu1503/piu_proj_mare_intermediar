import { useState } from 'react'
import { useTheme } from '../theme'

export default function SettingsPage(){
  const { theme, toggle } = useTheme()
  const [lang, setLang] = useState('ro')
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(true)

  return (
    <section className="fade-in">
      <h1 className="page-title">Setări cont</h1>

      <div className="grid grid-2" style={{marginTop:8}}>
        <div className="card">
          <div className="card-title">Profil</div>
          <div className="row" style={{gap:12}}>
            <div className="field" style={{flex:1}}>
              <label className="label" htmlFor="nume">Nume</label>
              <input id="nume" className="input" defaultValue="Alex" />
            </div>
            <div className="field" style={{flex:1}}>
              <label className="label" htmlFor="prenume">Prenume</label>
              <input id="prenume" className="input" defaultValue="Popescu" />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="parola">Parolă</label>
            <input id="parola" type="password" className="input" placeholder="••••••••" />
          </div>
          <button className="btn">Salvează profil</button>
        </div>

        <div className="card">
          <div className="card-title">Preferințe</div>
          <div className="row" style={{gap:12}}>
            <div className="field" style={{flex:1}}>
              <label className="label" htmlFor="lang">Limbă</label>
              <select id="lang" className="input" value={lang} onChange={e=>setLang(e.target.value)}>
                <option value="ro">Română</option>
                <option value="en">English</option>
              </select>
            </div>
            <div className="field" style={{flex:1}}>
              <label className="label">Temă</label>
              <button className="btn outline" onClick={toggle}>{theme==='dark'?'Dark':'Light'} — Comută</button>
            </div>
          </div>
          <div className="row" style={{gap:12}}>
            <label className="nav-item" style={{padding:8}}>
              <input type="checkbox" checked={emailNotif} onChange={e=>setEmailNotif(e.target.checked)} />&nbsp; Notificări email
            </label>
            <label className="nav-item" style={{padding:8}}>
              <input type="checkbox" checked={pushNotif} onChange={e=>setPushNotif(e.target.checked)} />&nbsp; Notificări push
            </label>
          </div>
        </div>
      </div>
    </section>
  )
}

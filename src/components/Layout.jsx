import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Bell, BookOpen, Calendar, CheckCircle2, FileText, Home, LogOut, Mail, Menu, MessageSquare, Settings, Sheet, SquareGanttChart, User, Users } from 'lucide-react'
import { useTheme } from '../theme'

function clsx(...args) { return args.filter(Boolean).join(' ') }

export default function Layout() {
  const { theme, toggle } = useTheme()
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const location = useLocation()

  const closePanels = () => { setNotifOpen(false); setProfileOpen(false) }

  return (
    <div className="app" onClick={() => closePanels()}>
      <header className="header" onClick={e => e.stopPropagation()}>
        <div className="brand">
          <button aria-label="Deschide meniul" className="icon-btn collapse-btn" onClick={() => setMobileNavOpen(v => !v)}>
            <Menu size={18} />
          </button>
          <div aria-hidden className="brand-logo" style={{fontSize:12}}>PIU</div>
          <div>
            <div className="brand-title">PIU – Intranet Universitar</div>
            <div className="brand-sub">Platformă academică internă</div>
          </div>
        </div>
        <div className="header-actions" role="toolbar" aria-label="Acțiuni rapide">
          <Link to="/setari" className="icon-btn" aria-label="Setări temă" onClick={e => e.stopPropagation()} title="Schimbă tema (light/dark)" onMouseDown={e=>e.preventDefault()}>
            <span onClick={(e)=>{ e.preventDefault(); toggle() }}>{theme === 'dark' ? '🌙' : '☀️'}</span>
          </Link>
          <div className={clsx('icon-btn','dropdown', notifOpen && 'open')} aria-haspopup="true" aria-expanded={notifOpen} onClick={(e)=>{e.stopPropagation(); setNotifOpen(o=>!o)}}>
            <span className="badge" data-badge="3" aria-label="Notificări">
              <Bell size={18} />
            </span>
            <div className="dropdown-panel" role="menu" aria-label="Panou notificări">
              <div className="dropdown-item">
                <CheckCircle2 size={18} color="#22C55E" />
                <div>
                  <div><strong>Nota actualizată</strong> la „Algoritmi”</div>
                  <div className="small muted">acum 2h</div>
                </div>
              </div>
              <div className="dropdown-item">
                <MessageSquare size={18} color="#165DFF" />
                <div>
                  <div>Mesaj nou de la Prof. Ionescu</div>
                  <div className="small muted">acum 4h</div>
                </div>
              </div>
              <div className="dropdown-item">
                <FileText size={18} color="#F59E0B" />
                <div>
                  <div>Cererea ta a fost aprobată</div>
                  <div className="small muted">ieri</div>
                </div>
              </div>
            </div>
          </div>
          <div className={clsx('profile','dropdown', profileOpen && 'open')} tabIndex={0} role="button" aria-haspopup="true" aria-expanded={profileOpen} onClick={(e)=>{e.stopPropagation(); setProfileOpen(o=>!o)}}>
            <img alt="Fotografie profil" src={`https://i.pravatar.cc/100?img=5`} />
            <span className="small">Alex Popescu</span>
            <div className="dropdown-panel" style={{top:48}}>
              <Link className="dropdown-item" to="/setari" onClick={()=>setProfileOpen(false)}><User size={16}/> Profil</Link>
              <Link className="dropdown-item" to="/setari" onClick={()=>setProfileOpen(false)}><Settings size={16}/> Setări</Link>
              <div className="sep" />
              <Link className="dropdown-item" to="/autentificare"><LogOut size={16}/> Deconectare</Link>
            </div>
          </div>
        </div>
      </header>

      <aside className="sidebar" aria-label="Meniu lateral" style={{display: mobileNavOpen ? 'flex' : undefined}} onClick={e=>e.stopPropagation()}>
        <div className="section">Navigare</div>
        <NavItem to="/" icon={<Home size={18}/>} label="Acasă / Dashboard" currentPath={location.pathname} />
        <NavItem to="/cursuri" icon={<BookOpen size={18}/>} label="Cursurile mele" currentPath={location.pathname} />
        <NavItem to="/orar" icon={<Calendar size={18}/>} label="Orar" currentPath={location.pathname} />
        <NavItem to="/note" icon={<SquareGanttChart size={18}/>} label="Note și rezultate" currentPath={location.pathname} />
        <NavItem to="/anunturi" icon={<Sheet size={18}/>} label="Anunțuri" currentPath={location.pathname} />
        <NavItem to="/mesaje" icon={<Mail size={18}/>} label="Mesagerie internă" currentPath={location.pathname} />
        <NavItem to="/cereri" icon={<FileText size={18}/>} label="Cereri administrative" currentPath={location.pathname} />
        <NavItem to="/taxe" icon={<Sheet size={18}/>} label="Taxe și plăți" currentPath={location.pathname} />
        <div className="section">Secretariat</div>
        <NavItem to="/documente" icon={<Users size={18}/>} label="Documente / Secretariat" currentPath={location.pathname} />
        <NavItem to="/studenti" icon={<User size={18}/>} label="Gestionare studenți" currentPath={location.pathname} />
        <NavItem to="/situatie-taxe" icon={<FileText size={18}/>} label="Situație taxe" currentPath={location.pathname} />
        <NavItem to="/admitere" icon={<FileText size={18}/>} label="Admitere" currentPath={location.pathname} />
        <div className="section">Cadre didactice</div>
        <NavItem to="/consultatii" icon={<Calendar size={18}/>} label="Consultații / Întâlniri" currentPath={location.pathname} />
        <NavItem to="/evaluari" icon={<SquareGanttChart size={18}/>} label="Evaluări" currentPath={location.pathname} />
        <NavItem to="/evaluare" icon={<CheckCircle2 size={18}/>} label="Evaluare curs" currentPath={location.pathname} />
        <div className="section">Cont</div>
        <NavItem to="/setari" icon={<Settings size={18}/>} label="Setări cont" currentPath={location.pathname} />
      </aside>

      <main className="main">
        <div className="container fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

function NavItem({ to, icon, label, currentPath }) {
  return (
    <NavLink to={to} className={({isActive}) => clsx('nav-item', (isActive || currentPath === to) && 'active')} aria-label={label}>
      {icon}
      <span>{label}</span>
    </NavLink>
  )
}

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { ThemeProvider } from './theme'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import Schedule from './pages/Schedule'
import Grades from './pages/Grades'
import Announcements from './pages/Announcements'
import Messaging from './pages/Messaging'
import Requests from './pages/Requests'
import Documents from './pages/Documents'
import SettingsPage from './pages/SettingsPage'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Loading from './pages/Loading'
import StudentsManage from './pages/StudentsManage'
import Consultations from './pages/Consultations'
import CourseEvaluation from './pages/CourseEvaluation'
import Evaluations from './pages/Evaluations'
import FeesAdmin from './pages/FeesAdmin'
import TaxPayments from './pages/TaxPayments'
import Admissions from './pages/Admissions'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/autentificare" element={<Login />} />
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="cursuri" element={<Courses />} />
            <Route path="orar" element={<Schedule />} />
            <Route path="note" element={<Grades />} />
            <Route path="anunturi" element={<Announcements />} />
            <Route path="mesaje" element={<Messaging />} />
            <Route path="cereri" element={<Requests />} />
            <Route path="documente" element={<Documents />} />
            <Route path="studenti" element={<StudentsManage />} />
            <Route path="consultatii" element={<Consultations />} />
            <Route path="evaluare" element={<CourseEvaluation />} />
            <Route path="evaluari" element={<Evaluations />} />
            <Route path="situatie-taxe" element={<FeesAdmin />} />
            <Route path="taxe" element={<TaxPayments />} />
            <Route path="admitere" element={<Admissions />} />
            <Route path="setari" element={<SettingsPage />} />
            <Route path="loading" element={<Loading />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

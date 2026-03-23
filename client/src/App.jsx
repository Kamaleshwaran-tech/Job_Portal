
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import RecruiterLogin from './components/RecruiterLogin'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'
import { ToastContainer } from 'react-toastify';
import "quill/dist/quill.snow.css";


function App() {
 
  const {showRecruiterLogin, companyToken} = useContext(AppContext)


  return (
    <>
      <div>
        {showRecruiterLogin && <RecruiterLogin/>}
        <ToastContainer/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/apply-job/:id' element={<ApplyJob/>} />
          <Route path='/applications' element={<Applications/>} />
          <Route path='/dashboard' element={<Dashboard/>} >
          {companyToken ? <>
            <Route index element={<Navigate to='manage-jobs' replace />} />
            <Route path='add-job' element={<AddJob/>}/>
            <Route path='manage-jobs' element={<ManageJobs/>} />
            <Route path='view-applications' element={<ViewApplications/>}/>
          </>: <Route index element={<Navigate to='/' replace />} />}
          </Route>
        </Routes>

      </div>
    </>
  )
}

export default App

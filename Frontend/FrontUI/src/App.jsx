import React, { useContext } from 'react'
import { Usecontext , UsecontextProvider } from './Pages/ContextApi/UserContext'
import Dashboard from './Pages/Instructor/Dashboard'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Login from "./Pages/Auth/Login"
import SignUp from "./Pages/Auth/SignUp"
import LandingPage from './Pages/Home/LandingPage'
import DefaultLayout from './Layouts/DefaultLayout'
import InstructorLayout from "./Layouts/Instructor/DefaultLayout_INS"
import Protected from './Utility/ProtectedRoutes/Protected'
import StudentDashboard from "./Pages/Students/Dashboard"
const App = () => {
     
  return (
    <Router>
        <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/SignUp' element={<SignUp/>}/>
            <Route path='/Instructor' 
              element={
                <Protected allowed={['Instructor']}>
                  <InstructorLayout/>
                </Protected>
              }
              
              >
              <Route path='Dashboard' element={<Dashboard/>}/>
            </Route>
            <Route path='/Student' 
              element={
                <Protected allowed={['Student']}>
                  <DefaultLayout/>
                </Protected>
              }
              
              >
              <Route path='Dashboard' element={<StudentDashboard/>}/>
            </Route>

        </Routes>
    </Router>
    
  )
}

export default App
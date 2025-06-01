import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import ReLogin from './pages/re-login'
import Success from './pages/success'
import Additional from './pages/additional'
import Identity from './pages/identity'
import AboutPage from './pages/about'
import HomePage from './pages/home'




export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/about' element={<AboutPage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/re-login' element={<ReLogin/>}/>
            
            <Route path='/login/auth/2' element={<Additional/>}/>
            <Route path='/login/auth/3' element={<Identity/>}/>
            
            <Route path='/success' element={<Success/>}/>
        </Routes>
    </BrowserRouter>
  )
}
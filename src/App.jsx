import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Signup} from './pages/Signup'
import {Login} from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import {LoanList} from './pages/LoanList'
import { PaymentHistory } from './pages/PaymentHistory'
import {Sidebar} from './components/Sidebar'

import './App.css'

function App() {

  return (
    <>
     <BrowserRouter>
     <div className="flex">
     <Sidebar/>
     <div className="ml-64 p-6 w-full min-h-screen bg-gray-100">
      <Routes>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/loanlist' element={<LoanList/>}></Route>
        <Route path='/paymenthistory' element={<PaymentHistory/>}></Route>
      </Routes>
      </div>
      </div>
     </BrowserRouter>
    </>
  )
}

export default App

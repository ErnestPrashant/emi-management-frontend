import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Signup} from './pages/Signup'
import {Login} from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import {LoanList} from './pages/LoanList'
import { PaymentHistory } from './pages/PaymentHistory'
import {Layout} from './components/Layout'

import './App.css'

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route element={<Layout/>}>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/loanlist' element={<LoanList/>}></Route>
        <Route path='/paymenthistory' element={<PaymentHistory/>}></Route>
        </Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

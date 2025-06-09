import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Signup} from './pages/Signup'
import {Login} from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import {LoanList} from './pages/LoanList'
import { PaymentHistory } from './pages/PaymentHistory'
import {Layout} from './components/Layout'
import {Communication} from './pages/Communication'
import {PrivateRoute} from './pages/PrivateRoute'

import './App.css'

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        {/* <Route element={<Layout/>}> */}
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/loanlist' element={<LoanList/>}></Route>
        <Route path='/paymenthistory' element={<PaymentHistory/>}></Route>
        <Route path='/communications' element={<Communication/>}></Route>
        {/* </Route> */}
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

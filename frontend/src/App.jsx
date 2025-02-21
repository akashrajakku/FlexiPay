import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import Send from './pages/Send';
import Home from './pages/Home';
import ProtectedRoutes from './utils/ProtectedRoutes'

function App() {

  return (
    <>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/dashboard' element={<Dashboard />} />
            </Route>
            <Route path='/send' element={<Send />} />
          </Routes>
        </Router>
    </>
  )
}

export default App

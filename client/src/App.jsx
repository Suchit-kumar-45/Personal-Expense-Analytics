import {Routes, Route,Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Landing from './pages/Landing.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/dashboard' element={<ProtectedRoutes><HomePage/></ProtectedRoutes>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  )
}
export function ProtectedRoutes(props) {
  if(localStorage.getItem('token')) {
    return props.children;
  } else {
    return <Navigate to="/login"/>;
  }
}
export default App

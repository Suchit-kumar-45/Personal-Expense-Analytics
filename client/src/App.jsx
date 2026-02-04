import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </>
      
  )
}

export default App

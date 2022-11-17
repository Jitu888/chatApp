import { useContext } from 'react';
import './App.css';
import Messenger from './pages/Messenger';
import Login from './pages/Login'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import { AuthContext } from './context/AuthContext';

function App() {
  const {user} = useContext(AuthContext)
  return (
    <>
      
      <BrowserRouter>
          <Routes>
             <Route path='/' element={user ? <Navigate to="/message"/> : <Login/>}/>
             <Route path='/message' element={user ? <Messenger/>  : <Login/>}/>


          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

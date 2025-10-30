import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';

import './App.css';
import Home from './pages/Home.jsx';
import SignUp from "./pages/SignUp.jsx";
import Login from './pages/Login.jsx';



function App() {
  return (
    <>
      <Toaster richColors position='top-right' />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup/student" element={<SignUp role={'student'} />} />
        <Route path="/signup/admin" element={<SignUp role={'admin'} />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </>

  );
}

export default App; 

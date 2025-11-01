import { Route, Routes } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Toaster } from 'sonner';
import { useEffect } from 'react';

import './App.css';
import Home from './pages/Home.jsx';
import SignUp from "./pages/SignUp.jsx";
import Login from './pages/Login.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import PageTitleManager from './components/PageTitle.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import { loadInitialData } from './utils/loadData.js';


function App() {
  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <>
      <Toaster richColors position='bottom-right' />
      <PageTitleManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </>

  );
}

export default App; 

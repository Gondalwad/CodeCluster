import { useState } from 'react';
import Header from './pages/components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Service from './pages/Service';
import SignIn from './pages/SignIn';
import Admin from './pages/Dashboards/Admin';
import Profile from './pages/Profile';
import DashboardLayout from './pages/components/DashboardLayout';
import SignUp from './pages/SignUp';
import Dashboard from './pages/components/Dashboard';
import UploadQuestions from './pages/excel-to-json/UploadQuestions.jsx';

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signin" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<UploadQuestions />} />
      </Routes>  
    </>
  )
}

export default App

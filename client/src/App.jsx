import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Service from './pages/Service';
import ProblemSolving from "./pages/ProblemSolving/problemSolver";

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Admin from './pages/Dashboards/Admin';

// Components & Layouts
import Header from './pages/components/Header';
import Dashboard from './pages/components/Dashboard';
import DashboardLayout from './pages/components/DashboardLayout';
import UploadQuestions from './pages/excel-to-json/UploadQuestions.jsx';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/problems" element={<ProblemSolving />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<UploadQuestions />} />
      </Routes>  
    </BrowserRouter>
  )
}

export default App;
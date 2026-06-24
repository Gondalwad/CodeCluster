import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ProblemSolving from './pages/ProblemSolving';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/problems" element={<ProblemSolving />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

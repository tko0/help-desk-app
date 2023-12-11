import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Menu from './components/Menu';
import HelpDeskForm from './components/HelpDeskForm';
import AdminPanel from './components/AdminPanel';
import ComingSoon from './components/ComingSoon';

const Home: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 50;
      const scrolled = window.scrollY > threshold;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarHeight = '64px';
  const paddingTop = '20px';

  return (
    <Router>
      <div style={{ marginTop: navbarHeight, paddingTop }}>
        <NavBar isScrolled={isScrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <Routes>
          <Route path="/help-desk-form" element={<HelpDeskForm />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route
            path="/"
            element={isMenuOpen ? <Menu isOpen={isMenuOpen} menuIconPosition={{
              top: 0,
              left: 0
            }} /> : <HomePage />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default Home;

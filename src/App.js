// src/App.js
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Core Components
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot'; // 1. IMPORT THE CHATBOT COMPONENT

// Page Components
import HomePage from './pages/HomePage';
import SalaryBreakdownPage from './pages/SalaryBreakdownPage';
import TaxInfoPage from './pages/TaxInfo';
import FinancialEducationPage from './pages/FinancialEducation';
import CalculatorsPage from './pages/CalculatorsPage';

// Global Styles
import './App.css';
import './components/Chatbot.css'; // 2. IMPORT THE CHATBOT CSS

function App() {
  const [page, setPage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // ... (pageVariants and pageTransition code remains the same)
  const pageVariants = {
    initial: { opacity: 0, x: '-20vw' },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: '20vw' },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  const renderPage = () => {
    const currentPage = page || 'home';
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {
            {
              'home': <HomePage setPage={setPage} />,
              'breakdown': <SalaryBreakdownPage />,
              'tax': <TaxInfoPage />,
              'education': <FinancialEducationPage />,
              'calculators': <CalculatorsPage />,
            }[currentPage]
          }
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header setPage={setPage} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <main className="flex-grow-1">
        {renderPage()}
      </main>
      <Footer />
      <Chatbot /> {/* 3. ADD THE CHATBOT COMPONENT HERE */}
    </div>
  );
}

export default App;

// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Wallet2, BarChartLine, Mortarboard, Calculator } from 'react-bootstrap-icons';

// A small component to fetch and display a quote
const QuoteDisplay = () => {
    const [quote, setQuote] = useState({ text: 'Loading inspirational quote...', author: '' });

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                // Fetch a random quote tagged with 'finance' or 'success'
                const response = await axios.get('https://api.quotable.io/random?tags=finance|success');
                setQuote({ text: response.data.content, author: response.data.author });
            } catch (error) {
                // Provide a fallback quote in case the API fails
                setQuote({ text: 'The secret to getting ahead is getting started.', author: 'Mark Twain' });
            }
        };
        fetchQuote();
    }, []); // The empty array ensures this runs only once when the component mounts

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <blockquote className="blockquote text-center text-muted fst-italic mt-5">
                <p>"{quote.text}"</p>
                <footer className="blockquote-footer">{quote.author}</footer>
            </blockquote>
        </motion.div>
    );
};

// The main HomePage component
const HomePage = ({ setPage }) => {
  return (
    <Container className="text-center py-5">
      {/* Hero Section with animation */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <h1 className="display-4 fw-bolder mb-3">
          Understand Your Salary, Taxes & Investments
        </h1>
        <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: '700px' }}>
          <b>Salaryfy's Mission:</b> To empower individuals with the financial clarity and knowledge needed to navigate their career journey, from their first paycheck to long-term wealth creation.
        </p>
      </motion.div>

      {/* Action Buttons with animation */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
          <Button onClick={() => setPage('breakdown')} variant="primary" size="lg" className="px-4 gap-3 rounded-pill">
            Analyze Your Salary
          </Button>
          <Button onClick={() => setPage('education')} variant="outline-secondary" size="lg" className="px-4 rounded-pill">
            Start Learning
          </Button>
        </div>
      </motion.div>
      
      {/* Navigation Cards */}
      <Row className="g-4">
        {[
          { icon: <Wallet2 size={30} />, title: "Salary Breakdown", page: "breakdown" },
          { icon: <BarChartLine size={30} />, title: "Tax Information", page: "tax" },
          { icon: <Mortarboard size={30} />, title: "Financial Literacy", page: "education" },
          { icon: <Calculator size={30} />, title: "Financial Tools", page: "calculators" },
        ].map((feature, index) => (
          <Col md={6} lg={3} key={index}>
            <motion.div whileHover={{ scale: 1.05 }} className="h-100">
              <Card onClick={() => setPage(feature.page)} className="h-100 shadow-sm" style={{ cursor: 'pointer' }}>
                <Card.Body className="d-flex flex-column justify-content-center align-items-center p-4">
                  <div className="feature-icon bg-primary bg-gradient text-white rounded-3 mb-3 p-3">{feature.icon}</div>
                  <h5 className="fw-bold">{feature.title}</h5>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Quote Component */}
      <QuoteDisplay />
    </Container>
  );
};

export default HomePage;
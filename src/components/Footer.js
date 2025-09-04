// src/components/Footer.js
import React from 'react';
import { Container } from 'react-bootstrap';
import { Github, Linkedin, Twitter } from 'react-bootstrap-icons';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-auto">
      <Container>
        <div className="mb-2">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white me-3"><Github size={24} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white me-3"><Linkedin size={24} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white"><Twitter size={24} /></a>
        </div>
        <p className="mb-1">&copy; {new Date().getFullYear()} Salaryfy.io. All rights reserved.</p>
        <p className="mb-0 small text-white-50">
          Built for educational purposes. Not financial advice.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
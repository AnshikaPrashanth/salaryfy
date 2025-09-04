// src/components/Header.js
import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap';
import { Sun, Moon } from 'react-bootstrap-icons';

const Header = ({ setPage, isDarkMode, setIsDarkMode }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleCloseMenu = () => setShowMenu(false);
  const handleShowMenu = () => setShowMenu(true);

  const handleNavClick = (page) => {
    setPage(page);
    handleCloseMenu();
  };

  return (
    <>
      <Navbar bg="body-tertiary" expand={false} className="shadow-sm sticky-top">
        <Container>
          <Navbar.Brand 
            href="#" 
            onClick={() => handleNavClick('home')} 
            className="fw-bold fs-4 text-primary"
          >
            Salaryfy.io
          </Navbar.Brand>

          <div className="d-flex align-items-center">
            <Button 
              variant="light" 
              className="me-2 rounded-circle p-2 lh-1"
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun color="orange" size={20} /> : <Moon size={20} />}
            </Button>
            
            <Navbar.Toggle 
              aria-controls="offcanvasNavbar" 
              onClick={handleShowMenu} 
              aria-label="Toggle navigation"
            />
          </div>

          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            show={showMenu}
            onHide={handleCloseMenu}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 fs-5">
                <Nav.Link onClick={() => handleNavClick('home')}>Home</Nav.Link>
                <Nav.Link onClick={() => handleNavClick('breakdown')}>Salary Breakdown</Nav.Link>
                <Nav.Link onClick={() => handleNavClick('tax')}>Tax Info</Nav.Link>
                <Nav.Link onClick={() => handleNavClick('education')}>Financial Literacy</Nav.Link>
                <Nav.Link onClick={() => handleNavClick('calculators')}>Calculators</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
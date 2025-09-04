// src/pages/FinancialEducationPage.js
import React from 'react';
import { Container, Card, Row, Col, Button, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';

const articles = [
    {
      title: 'The Art of Building Savings Habits',
      snippet: 'Learn proven strategies like the 50/30/20 rule to automate your savings and build a strong financial foundation.',
      link: 'https://www.investopedia.com/personal-finance/50-30-20-rule/',
      category: 'Savings Habits'
    },
    {
      title: 'Introduction to Mutual Funds & SIPs',
      snippet: 'Systematic Investment Plans (SIPs) are a powerful way to invest in mutual funds. Understand how they work to grow your wealth.',
      link: 'https://zerodha.com/varsity/module/personal-finance/chapter/investing-and-markets/',
      category: 'Mutual Funds'
    },
    {
      title: 'Tax-Saving Investments under 80C',
      snippet: 'Explore popular options like ELSS, PPF, and EPF to reduce your taxable income under Section 80C of the Income Tax Act.',
      link: 'https://cleartax.in/s/80c-deductions',
      category: 'Tax Savings'
    },
];

const FinancialEducationPage = () => {
    return (
        <Container className="py-5">
            <h2 className="text-center fw-bold mb-3">Financial Education Hub</h2>
            <p className="text-center text-muted mb-5">Empower yourself with the knowledge to make smart financial decisions.</p>
            
            <Row className="g-4">
                {articles.map((article, index) => (
                    <Col md={4} key={index}>
                      <motion.div whileHover={{ y: -10 }} className="h-100">
                        <Card className="h-100 shadow-sm">
                            <Card.Body className="d-flex flex-column">
                                <Badge pill bg="primary" className="mb-2 align-self-start">{article.category}</Badge>
                                <Card.Title as="h5" className="fw-bold">{article.title}</Card.Title>
                                <Card.Text className="text-muted small flex-grow-1">{article.snippet}</Card.Text>
                                <Button variant="dark" href={article.link} className="mt-3 align-self-start" target="_blank" rel="noopener noreferrer">
                                  Learn More
                                </Button>
                            </Card.Body>
                        </Card>
                      </motion.div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default FinancialEducationPage;
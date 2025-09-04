// src/pages/CalculatorsPage.js
import React, { useState } from 'react';
// Corrected import line below
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';

const SIPCalculator = () => {
    // ... rest of the component code remains the same
    const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);
    const [result, setResult] = useState(null);

    const calculateSIP = () => {
        const i = (rate / 100) / 12; // Monthly interest rate
        const n = years * 12; // Number of months
        const M = monthlyInvestment;

        const futureValue = M * ((((1 + i) ** n) - 1) / i) * (1 + i);
        const totalInvested = M * n;
        const wealthGained = futureValue - totalInvested;

        setResult({
            invested: totalInvested,
            gained: wealthGained,
            total: futureValue,
        });
    };

    return (
        <Card className="shadow-sm h-100">
            <Card.Header as="h5">SIP Calculator</Card.Header>
            <Card.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Monthly Investment (₹)</Form.Label>
                    <Form.Control type="number" value={monthlyInvestment} onChange={e => setMonthlyInvestment(parseFloat(e.target.value))} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Expected Return Rate (% p.a.)</Form.Label>
                    <Form.Control type="number" value={rate} onChange={e => setRate(parseFloat(e.target.value))} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Time Period (Years)</Form.Label>
                    <Form.Control type="number" value={years} onChange={e => setYears(parseFloat(e.target.value))} />
                </Form.Group>
                <Button variant="primary" onClick={calculateSIP} className="w-100">Calculate</Button>
                {result && (
                    <div className="mt-4 text-center">
                        <p className="mb-1">Invested Amount: <strong className="text-muted">₹{Math.round(result.invested).toLocaleString('en-IN')}</strong></p>
                        <p className="mb-1">Est. Returns: <strong className="text-success">₹{Math.round(result.gained).toLocaleString('en-IN')}</strong></p>
                        <h4 className="mt-2">Estimated Future Value: <strong className="text-primary">₹{Math.round(result.total).toLocaleString('en-IN')}</strong></h4>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

const CalculatorsPage = () => {
    return (
        <Container className="py-5">
            <h2 className="text-center fw-bold mb-3">Financial Tools</h2>
            <p className="text-center text-muted mb-5">Plan your investments and savings with our simple calculators.</p>
            <Row className="justify-content-center">
                <Col md={6} lg={5}>
                    <SIPCalculator />
                </Col>
            </Row>
        </Container>
    );
};

export default CalculatorsPage;
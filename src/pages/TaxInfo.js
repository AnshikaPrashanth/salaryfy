// src/pages/TaxInfoPage.js
import React, { useState } from 'react';
import { Container, Card, Row, Col, Table, Tabs, Tab, Form, InputGroup, Alert, Button } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const newRegimeSlabs = [
    { range: '0 - 3L', rate: 0 },
    { range: '3L - 6L', rate: 5 },
    { range: '6L - 9L', rate: 10 },
    { range: '9L - 12L', rate: 15 },
    { range: '12L - 15L', rate: 20 },
    { range: 'Above 15L', rate: 30 },
];

const TaxInfoPage = () => {
    const [taxableIncome, setTaxableIncome] = useState('');
    const [estimatedTax, setEstimatedTax] = useState(null);

    const calculateTax = () => {
        let income = parseFloat(taxableIncome) - 50000; // Standard Deduction
        if (isNaN(income) || income <= 0) {
            setEstimatedTax(0);
            return;
        }

        let tax = 0;
        if (income > 1500000) tax += (income - 1500000) * 0.30;
        if (income > 1200000) tax += (Math.min(income, 1500000) - 1200000) * 0.20;
        if (income > 900000)  tax += (Math.min(income, 1200000) - 900000) * 0.15;
        if (income > 600000)  tax += (Math.min(income, 900000) - 600000) * 0.10;
        if (income > 300000)  tax += (Math.min(income, 600000) - 300000) * 0.05;

        // Health & Education Cess
        tax = tax * 1.04; 
        setEstimatedTax(tax.toFixed(2));
    };

    const chartData = {
        labels: newRegimeSlabs.map(s => s.range),
        datasets: [{
            label: 'Tax Rate (%)',
            data: newRegimeSlabs.map(s => s.rate),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
        }],
    };

    return (
        <Container className="py-5">
            <h2 className="text-center fw-bold mb-3">Indian Income Tax Information</h2>
            <p className="text-center text-muted mb-5">Details for Financial Year 2025-26 (Assessment Year 2026-27) under the New Tax Regime.</p>

            <Row className="g-4">
                <Col lg={7}>
                    <Card className="shadow-sm">
                        <Card.Header as="h5">New Tax Regime Slabs & Rates</Card.Header>
                        <Card.Body>
                            <Bar data={chartData} options={{ indexAxis: 'y', responsive: true, plugins: { legend: { display: false } } }} />
                        </Card.Body>
                    </Card>
                </Col>
                 <Col lg={5}>
                    <Card className="shadow-sm">
                        <Card.Header as="h5">Quick Tax Estimator</Card.Header>
                        <Card.Body>
                            <p>Enter your annual taxable income to get an estimated tax amount (New Regime).</p>
                             <InputGroup>
                                <InputGroup.Text>₹</InputGroup.Text>
                                <Form.Control 
                                    type="number" 
                                    placeholder="e.g., 1000000"
                                    value={taxableIncome}
                                    onChange={e => setTaxableIncome(e.target.value)}
                                />
                                <Button variant="primary" onClick={calculateTax}>Estimate</Button>
                            </InputGroup>
                            {estimatedTax !== null && (
                                <Alert variant="success" className="mt-3">
                                    If your salary is <strong>₹{parseFloat(taxableIncome).toLocaleString('en-IN')}</strong>, your estimated annual tax is approximately <strong>₹{parseFloat(estimatedTax).toLocaleString('en-IN')}</strong>.
                                </Alert>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default TaxInfoPage;
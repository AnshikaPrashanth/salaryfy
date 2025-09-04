// src/pages/SalaryBreakdownPage.js
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, InputGroup, Alert, Table } from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const SalaryBreakdownPage = () => {
    const [ctc, setCtc] = useState('');
    const [breakdown, setBreakdown] = useState(null);

    const calculateBreakdown = () => {
        const annualCTC = parseFloat(ctc);
        if (isNaN(annualCTC) || annualCTC <= 0) {
            setBreakdown(null);
            return;
        }

        // Standard breakdown assumptions
        const basicSalary = annualCTC * 0.40;
        const hra = basicSalary * 0.50; // Assuming metro city
        const pfContribution = basicSalary * 0.12;
        const specialAllowance = annualCTC - basicSalary - hra - pfContribution;

        const monthlyGross = (basicSalary + hra + specialAllowance) / 12;
        const monthlyPF = pfContribution / 12;
        // Simplified Professional Tax for demonstration
        const monthlyPT = monthlyGross > 15000 ? 200 : 0;
        
        const monthlyDeductions = monthlyPF + monthlyPT;
        const monthlyNet = monthlyGross - monthlyDeductions;

        setBreakdown({
            annual: { ctc: annualCTC, basic: basicSalary, hra, pf: pfContribution, allowance: specialAllowance },
            monthly: { gross: monthlyGross, pf: monthlyPF, pt: monthlyPT, deductions: monthlyDeductions, net: monthlyNet }
        });
    };
    
    const chartData = breakdown ? {
        labels: ['In-Hand Salary', 'Provident Fund', 'Allowances', 'HRA'],
        datasets: [{
            data: [breakdown.monthly.net, breakdown.monthly.pf, (breakdown.annual.allowance/12), (breakdown.annual.hra/12)],
            backgroundColor: ['#28a745', '#ffc107', '#17a2b8', '#fd7e14'],
        }],
    } : null;

    return (
        <Container className="py-5">
            <h2 className="text-center fw-bold mb-3">Salary Breakdown Calculator</h2>
            <p className="text-center text-muted mb-4">Enter your Annual CTC to see an estimated breakdown of your salary components and in-hand pay.</p>
            <Row className="justify-content-center">
                <Col md={6}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>₹</InputGroup.Text>
                        <Form.Control 
                            type="number" 
                            placeholder="Enter Annual CTC (e.g., 1200000)" 
                            value={ctc}
                            onChange={e => setCtc(e.target.value)}
                        />
                        <Button variant="primary" onClick={calculateBreakdown}>Calculate</Button>
                    </InputGroup>
                </Col>
            </Row>

            {breakdown && (
                <Row className="mt-4 g-4">
                    <Col md={7}>
                        <Card className="shadow-sm">
                            <Card.Header as="h5">Salary Breakdown</Card.Header>
                            <Card.Body>
                                <Alert variant="info">
                                    <strong>Annual CTC: ₹{breakdown.annual.ctc.toLocaleString('en-IN')}</strong>
                                </Alert>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr><th>Component</th><th>Annual (₹)</th><th>Monthly (₹)</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>Basic Salary</td><td>{breakdown.annual.basic.toLocaleString('en-IN')}</td><td>{(breakdown.annual.basic/12).toLocaleString('en-IN')}</td></tr>
                                        <tr><td>House Rent Allowance (HRA)</td><td>{breakdown.annual.hra.toLocaleString('en-IN')}</td><td>{(breakdown.annual.hra/12).toLocaleString('en-IN')}</td></tr>
                                        <tr><td>Special Allowance</td><td>{breakdown.annual.allowance.toLocaleString('en-IN')}</td><td>{(breakdown.annual.allowance/12).toLocaleString('en-IN')}</td></tr>
                                        <tr className="table-secondary"><td><strong>Gross Salary</strong></td><td><strong>{(breakdown.annual.ctc - breakdown.annual.pf).toLocaleString('en-IN')}</strong></td><td><strong>{breakdown.monthly.gross.toLocaleString('en-IN')}</strong></td></tr>
                                        <tr><td>(-) Provident Fund (PF)</td><td>{breakdown.annual.pf.toLocaleString('en-IN')}</td><td>{breakdown.monthly.pf.toLocaleString('en-IN')}</td></tr>
                                        <tr><td>(-) Professional Tax (PT)</td><td>{(breakdown.monthly.pt * 12).toLocaleString('en-IN')}</td><td>{breakdown.monthly.pt.toLocaleString('en-IN')}</td></tr>
                                        <tr className="table-success"><td><strong>In-Hand Salary</strong></td><td><strong>{(breakdown.monthly.net * 12).toLocaleString('en-IN')}</strong></td><td><strong>{breakdown.monthly.net.toLocaleString('en-IN')}</strong></td></tr>
                                    </tbody>
                                </Table>
                                <p className="text-muted small">*Note: This is an estimate. Income tax has not been deducted. Actual breakdown may vary based on company policy.</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={5}>
                         <Card className="shadow-sm">
                            <Card.Header as="h5">Monthly Component Chart</Card.Header>
                            <Card.Body>
                                {chartData && <Pie data={chartData} />}
                            </Card.Body>
                         </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default SalaryBreakdownPage;
// src/components/Chatbot.js
import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { ChatDots, X } from 'react-bootstrap-icons';
import './Chatbot.css'; // We will create this CSS file next

const faqData = {
  "What is CTC?": "Cost to Company (CTC) is the total annual amount a company spends on an employee, including salary, allowances, and benefits like PF.",
  "What are tax slabs?": "Tax slabs are different income ranges taxed at different rates. For FY 2025-26 (New Regime), income up to ₹3 lakh is tax-free, ₹3-6 lakh is taxed at 5%, and so on.",
  "How can I save tax?": "You can save tax under the Old Regime through deductions like Section 80C (for investments in PPF, ELSS), 80D (health insurance), and HRA exemption.",
  "What is PF?": "Provident Fund (PF) is a retirement savings scheme where both you and your employer contribute a portion of your salary every month."
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! How can I help you today?' }
  ]);

  const chatBodyRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleQuestionClick = (question) => {
    const answer = faqData[question];
    setMessages(prevMessages => [
      ...prevMessages,
      { from: 'user', text: question },
      { from: 'bot', text: answer }
    ]);
  };

  return (
    <>
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <h5>Salaryfy Assistant</h5>
          <Button variant="link" onClick={() => setIsOpen(false)} className="p-0 text-white">
            <X size={28} />
          </Button>
        </div>
        <div className="chat-body" ref={chatBodyRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.from}`}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="chat-footer">
            <p className="small text-muted mb-2">Or choose a question:</p>
            {Object.keys(faqData).map((question, index) => (
                <Button 
                    key={index} 
                    variant="outline-primary" 
                    className="faq-button"
                    onClick={() => handleQuestionClick(question)}
                >
                    {question}
                </Button>
            ))}
        </div>
      </div>

      <Button className="chatbot-fab" onClick={() => setIsOpen(true)}>
        <ChatDots size={30} />
      </Button>
    </>
  );
};

export default Chatbot;

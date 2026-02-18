import React from 'react';

export const FaqItem = ({ question, answer }) => (
    <div className="faq-item">
        <h4>{question}</h4>
        <p>{answer}</p>
    </div>
);

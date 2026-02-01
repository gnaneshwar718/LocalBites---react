import React, { useState } from 'react';
import { Modal } from '../molecules/Modal';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import '../../styles/explore/budget.css';

export const BudgetModal = ({ isOpen, onClose, onApply }) => {
    const [totalBudget, setTotalBudget] = useState('');
    const [numPeople, setNumPeople] = useState('');
    const [numMeals, setNumMeals] = useState('');
    const [budgetPerPerson, setBudgetPerPerson] = useState(0);
    const calculateBudget = () => {
        const budget = parseFloat(totalBudget);
        const people = parseInt(numPeople) || 1;
        const meals = parseInt(numMeals) || 1;

        if (budget && budget > 0) {
            const result = Math.round(budget / (people * meals));
            setBudgetPerPerson(result);
            return result;
        } else {
            setBudgetPerPerson(0);
            return 0;
        }
    };
    const handleCalculate = () => {
        const result = calculateBudget();
        if (onApply) {
            onApply(result);
        }
        onClose();
    };
    React.useEffect(() => {
        calculateBudget();
    }, [totalBudget, numPeople, numMeals]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Quick Budget Calculator" className="budget-modal" id="budget-modal">
            <div className="filter-section">
                <label htmlFor="totalBudget" className="input-label">Total Budget</label>
                <Input
                    type="number"
                    id="totalBudget"
                    className="budget-input"
                    placeholder="e.g. 8000"
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(e.target.value)}
                />
            </div>
            <div className="budget-grid">
                <div className="filter-section">
                    <label htmlFor="numPeople" className="input-label">Number of People</label>
                    <Input
                        type="number"
                        id="numPeople"
                        className="budget-input"
                        placeholder="e.g. 10"
                        value={numPeople}
                        onChange={(e) => setNumPeople(e.target.value)}
                    />
                </div>
                <div className="filter-section">
                    <label htmlFor="numMeals" className="input-label">Number of meals</label>
                    <Input
                        type="number"
                        id="numMeals"
                        className="budget-input"
                        placeholder="e.g. 2"
                        value={numMeals}
                        onChange={(e) => setNumMeals(e.target.value)}
                    />
                </div>
            </div>
            <div className="filter-section">
                <h3 className="mb-half">Budget per person, per meal</h3>
                <div id="budgetPerPerson" className="budget-result">{budgetPerPerson}</div>
            </div>
            <div className="modal-footer">
                <Button id="calcBudgetBtn" className="btn btn-primary w-full" onClick={handleCalculate}>
                    View Restaurants
                </Button>
            </div>
        </Modal>
    );
};

import React, { useState } from 'react';
import { handleError } from '../utils';

function ExpenseTrackerForm({ addExpenses }) {
    const [expenseInfo, setExpenseInfo] = useState({ text: '', amount: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpenseInfo({ ...expenseInfo, [name]: value });
    };

    const handleExpense = (e) => {
        e.preventDefault();
        
        const { text, amount } = expenseInfo;
        const parsedAmount = parseFloat(amount);
    
        if (!text || isNaN(parsedAmount)) {
            handleError('All fields are required and amount must be a number');
            return;
        }

        const newExpense = { text, amount: parsedAmount };

        console.log("Adding Expense:", newExpense);
        
       
        setTimeout(()=>{
        setExpenseInfo({ text: '', amount: '' }); // Reset form
    },2000)

    addExpenses(newExpense);  // Update parent state
    };

    return (
        <div className='container'>
            <h1>Personal-Finance-Manager</h1>
            <form onSubmit={handleExpense}>
                <div >
                    <label htmlFor='text'>Expense-Information</label>
                    <input className='b'
                        onChange={handleChange}
                        type='text'
                        name='text'
                        placeholder=' Enter your expense detail...'
                        value={expenseInfo.text}
                    />
                </div>
                <div>
                    <label htmlFor='amount'>Amount</label>
                    <input className='b'
                        onChange={handleChange}
                        type='number'
                        name='amount'
                        placeholder='Enter amount (Expense: -ve, Income: +ve)'
                        value={expenseInfo.amount}
                    />
                </div>
                <button className='add-expense-btn' type='submit'>
                    Add Expense
                </button>
            </form>
        </div>
    );
}

export default ExpenseTrackerForm;

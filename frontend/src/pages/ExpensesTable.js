function ExpensesTable({ expenses, handleDeleteExpense }) {
    console.log('[ExpensesTable] -->', expenses);

    // Ensure expenses is always an array
    const safeExpenses = Array.isArray(expenses) ? expenses : [];

    return (
        <div className='expense-list'>
            {safeExpenses.map((expense, index) => (
                <div key={index} className='expense-item'>
                    <button 
                        className='delete-button'
                        onClick={() => handleDeleteExpense(expense._id)}
                    >
                        X
                    </button>
                    <div className='expense-description'>{expense.text}</div>
                    <div className='expense-amount'
                        style={{ color: expense.amount > 0 ? '#27ae60' : '#e74c3c' }}
                    >
                        {expense.amount}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ExpensesTable;

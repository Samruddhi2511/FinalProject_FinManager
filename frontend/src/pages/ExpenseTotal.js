import React from 'react'

function ExpenseTotal({incomeAmt, expenseAmt}) {
  return (
    <div>
        <div className='balance-container'> 
            your balance is 
            < span className=' balance-amount '>{incomeAmt-expenseAmt}</span>
        </div>
        <div className='amt-container'>
            Income
            < span className=' income-amount '>{ incomeAmt}</span>
            </div>
            <div  className='amt-container'>
            Expense
            <span className='expense-amount'>{expenseAmt}</span>
        </div>
    </div>
  )
}

export default ExpenseTotal
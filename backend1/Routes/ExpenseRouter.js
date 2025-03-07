const { fetchExpenses, addExpenses, deleteExpenses } = require('../Controllers/ExpenseController');
 

const router = require('express').Router();

//router.get('/',(req,res)=>res.send('expense get added successfully'));

//fetch all expenses of the user based on user ID
router.get('/',fetchExpenses);

//add expenses
router.post('/',addExpenses);

//delete expenses
router.delete('/:expenseId', deleteExpenses);


module.exports =router;
const { fechExpenses,addExpenses, deleteExpenses } = require('../Controllers/ExpenseController');

const router = require('express').Router();


//fetch all expenses
//router.get('/',(req,res)=>res.send('expense working'));

router.get('/',fechExpenses);

//add expenses
router.post('/',addExpenses);

//dlt expenses
router.delete('/:expenseID',deleteExpenses);
module.exports= router;
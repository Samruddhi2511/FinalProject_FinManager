const addExpenses=(req,res)=>{

    const body=req.body;
    const {_id}=req.user;
    console.log(body,_id);
    res.send('success');
}

const fechExpenses=(req,res)=>{
    res.send('addExpense');
}

const deleteExpenses=(req,res)=>{
    res.send('deleteExpense');
}

module.exports={
    addExpenses,
    fechExpenses,
    deleteExpenses
}
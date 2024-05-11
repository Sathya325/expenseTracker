const {addIncome,getIncomes,deleteIncomes}=require('../controllers/income');
const {addExpense,getExpense,deleteExpense}=require('../controllers/expense');

const router=require('express').Router()

// income routes
router.post('/add-income',addIncome);
router.get('/get-incomes',getIncomes);
router.delete('/delete-income/:id',deleteIncomes);

// expense routes
router.post('/add-expense',addExpense);
router.get('/get-expenses',getExpense);
router.delete('/delete-expense/:id',deleteExpense);
module.exports=router;
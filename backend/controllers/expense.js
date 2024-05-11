const ExpenseSchema=require("../models/ExpenseModel");

exports.addExpense=async (req,res)=>{
    const {title,amount,category,description,date}=req.body;

    const income=ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })
    try{
        // validations
        if(!title||!category||!description||!date){
            return res.status(400).json({message:"All fields are required!"})
        }
        if(amount<=0|| !amount==='number'){
            return res.status(400).json({message:"Amount must be a number!"})
        }
        await income.save();
        return res.status(200).json({message:"Expense Added"});
    }catch(error){
        return res.status(500).json({message:"Server error"});
    }
}

exports.getExpense=async (req,res)=>{
    try{
        const incomes=await ExpenseSchema.find().sort({createdAt:-1})
        return res.status(200).json(incomes)
    }catch(error){
        return res.status(500).json({message:"Server Error"});
    }
}

exports.deleteExpense=async (req,res)=>{
    const {id}=req.params;
    ExpenseSchema.findByIdAndDelete(id)
    .then((income)=>{
        return res.status(200).json({message:"Expense Deleted"});
    })
    .catch((err)=>{
        return res.status(500).json({message:"Server Error"});
    })
}
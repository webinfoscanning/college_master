const expenseRoutes = require("express").Router();
const ExpenseController = require("../../controllers/expense/expense.controller");
const { verifyauth } = require('../../service/jwtauth.service');

// const {checkMasterDataAccess} = require("../../service/masteraccess.control");

/* expense data */
expenseRoutes.get("/list", ExpenseController.AllExpense); //verifyauth
expenseRoutes.post("/add", ExpenseController.CreateExpense);
expenseRoutes.put("/update/:id", ExpenseController.UpdateExpense);
expenseRoutes.delete("/delete/:id", ExpenseController.DeleteExpense);

expenseRoutes.get("/getdata/:id", ExpenseController.getExpenseById);

module.exports = expenseRoutes;

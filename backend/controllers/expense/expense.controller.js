const createErrors = require("http-errors");
const { object } = require("joi");
const database = require("../../db");
const validate = require("../../helpers/joi.expense");

/********************expense date**********************/

exports.AllExpense = async (req, res, next) => {
  try {
    const userQuerys = await validate.CheckInstitutionId.validateAsync(
      req.query
    );
    const institutionId = userQuerys.institutionId;

    let fields = `id, institutionId, expType,expAmount,expTowordsAccount,expDate,refNumber,paymentBy,paymentMode,venderName, DATE_FORMAT(createdOn, '%Y-%m-%d %h:%i:%s') as createdOn, DATE_FORMAT(lastEditedOn, '%Y-%m-%d %h:%i:%s') as lastEditedOn`;

    const [...result] = await database.query(
      `SELECT ${fields} FROM smsExpense WHERE  isDeleted = '0' and institutionId = '${institutionId}' ORDER BY createdOn DESC`
    );
    res.status(200).json({
      message: "All expense data",
      status: true,
      statuscode: 200,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

exports.getExpenseById = async (req, res, next) => {
    try {
      const userQuery = await validate.CheckInstitutionId.validateAsync(req.query);
      const userParams = await validate.CheckParams.validateAsync(req.params);
      const institutionId = userQuery.institutionId;
      const id = userParams.id;
  
      const [...Expense] = await database.query(
        `SELECT * FROM smsExpense WHERE  isDeleted = '0' and institutionId = '${institutionId}' and id = '${id}' ORDER BY createdOn DESC`
      );
    //   console.log(Expense);
      res.status(200).json({
        message: "Expense details",
        status: true,
        statuscode: 200,
        data: Expense,
      });
    } catch (e) {
      next(e);
    }
  };

exports.CreateExpense = async (req, res, next) => {
  try {
    const createdBy = 1; //logged in user
    const isDeleted = 0;
    const userInputs = await validate.AddUpdateExpense.validateAsync(req.body);

    
    const response = await database.execute(
      `INSERT INTO 
      smsExpense(institutionId, expType, expAmount, expTowordsAccount, expDate, refNumber, paymentBy, paymentMode, venderName, isDeleted, createdBy, createdOn) 
    VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        userInputs.institutionId || "",
        userInputs.expType || "",
        userInputs.expAmount || "",
        userInputs.expTowordsAccount || "",
        userInputs.expDate || "",
        userInputs.refNumber || "",
        userInputs.paymentBy || "",
        userInputs.paymentMode || "",
        userInputs.venderName || "",
        isDeleted,
        createdBy,
        new Date(),
      ]
    );

    let message;
    if (response.affectedRows === 1) {
      const [result] = await database.query(
        `SELECT id, institutionId, expType, expAmount, expTowordsAccount, expDate, refNumber, paymentBy, paymentMode, venderName, isDeleted FROM smsExpense WHERE id = '${parseInt(response.insertId)}'`
      );
      message = {
        message: "Successfully added the expense",
        status: true,
        statuscode: 200,
        data: result
      };
    } else {
      message = { 
        message: "Failed to add the expense", 
        status: false, 
        statuscode: 200,
        data:null
      };
    }

    res.json(message);
  } catch (e) {
    next(e);
  }
};

exports.UpdateExpense = async (req, res, next) => {
  try {
    const userInputs = await validate.AddUpdateExpense.validateAsync(req.body);
    const userParams = await validate.CheckParams.validateAsync(req.params);
    const editedBy = 1; //logged in user

    const response = await database.query(
      `UPDATE smsExpense SET 
      expType = '${userInputs.expType}', expAmount = '${userInputs.expAmount}', expTowordsAccount = '${userInputs.expTowordsAccount}', 
      expDate = '${userInputs.expDate}', refNumber = '${userInputs.refNumber}', paymentBy = '${userInputs.paymentBy}', 
      paymentMode = '${userInputs.paymentMode}', venderName = '${userInputs.venderName}',
      editedBy = ${editedBy}, lastEditedOn = NOW()  
      WHERE institutionId = '${userInputs.institutionId}' and id = '${userParams.id}';`
    );
    let message;
    if (response.affectedRows === 1) {
      const [result] = await database.query(
        `SELECT * FROM smsExpense WHERE institutionId = '${userInputs.institutionId}' and id = '${userParams.id}'`
      );
      message = {
        message: "Successfully update the expense",
        status: true,
        statuscode: 200,
        data: result,
      };
    } else {
      message = { 
        message: "Failed to update the expense", 
        status: false, 
        statuscode: 200,
        data:null
      };
    }

    res.status(200).send(message);
  } catch (e) {
    next(e);
  }
};

exports.DeleteExpense = async (req, res, next) => {
    const userQuerys = await validate.CheckInstitutionId.validateAsync(req.query);
    const userParams = await validate.CheckParams.validateAsync(req.params);
    const institutionId = userQuerys.institutionId;
        try {

    const result = await database.query(
      `UPDATE smsExpense SET isDeleted = '1' WHERE institutionId = '${institutionId}' and id = '${userParams.id}';`
    );
    let message;
    if (result.affectedRows === 1) {
      message = {
        message: "Succesfully deleted the expense",
        status: true,
        statuscode: 200,
        data:null
      };
    } else {
      message = { 
        message: "Failed to delete the expense", 
        status: false, 
        statuscode: 200,
        data:null
      };
    }
    res.status(200).send(message);
  } catch (e) {
    next(e);
  }
};

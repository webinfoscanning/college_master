const createErrors = require("http-errors");
const { object } = require("joi");
const database = require("../../db");
const validate = require("../../helpers/joi.asset");






/********************employee date**********************/

exports.AllAsset = async (req, res, next) => {
  try {
    const userQuerys = await validate.CheckInstitutionId.validateAsync(
      req.query
    );
    const institutionId = userQuerys.institutionId;

    let fields = `id, institutionId, category, product, document,agreement, DATE_FORMAT(createdOn, '%Y-%m-%d %h:%i:%s') as createdOn, DATE_FORMAT(lastEditedOn, '%Y-%m-%d %h:%i:%s') as lastEditedOn`;

    const [...result] = await database.query(
      `SELECT ${fields} FROM smsAsset WHERE  isDeleted = '0' and institutionId = '${institutionId}' ORDER BY createdOn DESC`
    );
    res.status(200).json({
      message: "All asset data",
      status: true,
      statuscode: 200,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

exports.getAssetById = async (req, res, next) => {
  try {
    const userQuery = await validate.CheckInstitutionId.validateAsync(req.query);
    const userParams = await validate.CheckParams.validateAsync(req.params);
    const institutionId = userQuery.institutionId;
    const id = userParams.id;

    const [...Asset] = await database.query(
      `SELECT * FROM smsAsset WHERE  isDeleted = '0' and institutionId = '${institutionId}' and id = '${id}' ORDER BY createdOn DESC`
    );
    res.status(200).json({
      message: "Asset details",
      status: true,
      statuscode: 200,
      data: Asset,
    });
  } catch (e) {
    next(e);
  }
};


exports.CreateAsset = async (req, res, next) => {
  try {
    const createdBy = 1; //logged in user
    const isDeleted = 0;
    const userInputs = await validate.AddUpdateAsset.validateAsync(req.body);

    
    const response = await database.execute(
      `INSERT INTO 
      smsAsset(institutionId, category, product, document, agreement, isDeleted, createdBy, createdOn) 
    VALUES(?,?,?,?,?,?,?,?)`,
      [
        userInputs.institutionId || "",
        userInputs.category || "",
        userInputs.product || "",
        userInputs.document || "",
        userInputs.agreement || "",
        isDeleted,
        createdBy,
        new Date(),
      ]
    );

    let message;
    if (response.affectedRows === 1) {
      const [result] = await database.query(
        `SELECT id, institutionId, category, product, document, agreement, isDeleted FROM smsAsset WHERE id = '${parseInt(response.insertId)}'`
      );
      message = {
        message: "Successfully added the asset",
        status: true,
        statuscode: 200,
        data: result
      };
    } else {
      message = { 
        message: "Failed to add the asset", 
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

exports.UpdateAsset = async (req, res, next) => {
  try {
    const userInputs = await validate.AddUpdateAsset.validateAsync(req.body);
    const userParams = await validate.CheckParams.validateAsync(req.params);
    const editedBy = 1; //logged in user

    const response = await database.query(
      `UPDATE smsAsset SET 
      category = '${userInputs.category}',product = '${userInputs.product}',document = '${userInputs.document}',
      agreement = '${userInputs.agreement}', editedBy = ${editedBy}, lastEditedOn = NOW()  
      WHERE institutionId = '${userInputs.institutionId}' and id = '${userParams.id}';`
    );
    let message;
    if (response.affectedRows === 1) {
      const [result] = await database.query(
        `SELECT * FROM smsAsset WHERE institutionId = '${userInputs.institutionId}' and id = '${userParams.id}'`
      );
      message = {
        message: "Successfully update the asset",
        status: true,
        statuscode: 200,
        data: result,
      };
    } else {
      message = { 
        message: "Failed to update the asset", 
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

exports.DeleteAsset = async (req, res, next) => {
    const userQuerys = await validate.CheckInstitutionId.validateAsync(req.query);
    const userParams = await validate.CheckParams.validateAsync(req.params);
    const institutionId = userQuerys.institutionId;
        try {

    const result = await database.query(
      `UPDATE smsAsset SET isDeleted = '1' WHERE institutionId = '${institutionId}' and id = '${userParams.id}';`
    );
    let message;
    if (result.affectedRows === 1) {
      message = {
        message: "Succesfully deleted the asset",
        status: true,
        statuscode: 200,
        data:null
      };
    } else {
      message = { 
        message: "Failed to delete the asset", 
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





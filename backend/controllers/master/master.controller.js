const createErrors = require("http-errors");
const { object } = require("joi");
const database = require("../../db");
const validate = require("../../helpers/joi.master");
// const { Client } = require("@googlemaps/google-maps-services-js");

/********************master date**********************/

exports.AllMaster = async (req, res, next) => {
  try {
    const ConfigurationalMasterIds =
      "'" + req.ConfigurationalMasterIds.join("'" + "," + "'") + "'";
    const GenericMasterIds =
      "'" + req.GenericMasterIds.join("'" + "," + "'") + "'";

    const userQuerys = await validate.CheckInstitutionId.validateAsync(
      req.query
    );
    const institutionId = userQuerys.institutionId;
    const page = userQuerys.page;
    
    // console.log(ConfigurationalMasterIds);

    let data;
    if(page == 'all'){
      // || SUBSTRING(headerPrefix,1,3) = 'gen'
      const [...allmaster] = await database.query(
        `SELECT institutionId, id, name, description, headerPrefix, headerValue, DATE_FORMAT(createdOn, '%Y-%m-%d %h:%i:%s') as createdOn, DATE_FORMAT(lastEditedOn, '%Y-%m-%d %h:%i:%s') as lastEditedOn FROM smsHeaderName WHERE (SUBSTRING(headerPrefix,1,6) = 'config') and isDeleted = '0' and institutionId = '${institutionId}' ORDER BY createdOn DESC`
      );
      data = allmaster;
    } else {
      const [...AllConfigurationalMaster] = await database.query(
        `SELECT institutionId, id, name, description, headerPrefix, headerValue, DATE_FORMAT(createdOn, '%Y-%m-%d %h:%i:%s') as createdOn, DATE_FORMAT(lastEditedOn, '%Y-%m-%d %h:%i:%s') as lastEditedOn FROM smsHeaderName WHERE headerPrefix IN (${ConfigurationalMasterIds}) and isDeleted = '0' and institutionId = '${institutionId}' ORDER BY createdOn DESC`
      );
      const [...AllGenericMaster] = await database.query(
        `SELECT institutionId, id, name, description, headerPrefix, headerValue, DATE_FORMAT(createdOn, '%Y-%m-%d %h:%i:%s') as createdOn, DATE_FORMAT(lastEditedOn, '%Y-%m-%d %h:%i:%s') as lastEditedOn FROM smsHeaderName WHERE headerPrefix IN (${GenericMasterIds}) and isDeleted = '0' and institutionId = '${institutionId}' ORDER BY createdOn DESC`
      );

      data = {
        ConfigurationalMaster: AllConfigurationalMaster,
        GenericMaster: AllGenericMaster,
      };
    }
    
    

    
    res.status(200).json({
      message: "All header master data",
      status: true,
      data: data,
    });
  } catch (e) {
    next(e);
  }
};

exports.CreateMaster = async (req, res, next) => {
  let message;
  try {
    const createdBy = 1; //logged in user
    const userInputs = await validate.AddUpdateMaster.validateAsync(req.body);

    const [rowname] = await database.query(
      `SELECT count(id) tid FROM smsHeaderName WHERE name = '${userInputs.name}' and institutionId = '${userInputs.institutionId}'`
    );

    if (rowname.tid) {
      throw createErrors.Conflict(
        `"${userInputs.name}" already used, please choose another name!`
      );
    }

    const data = await database.execute(
      `INSERT INTO 
      smsHeaderName(institutionId,name,description,createdBy,createdOn) 
    VALUES(?,?,?,?,?)`,
      [
        userInputs.institutionId || "",
        userInputs.name || "",
        userInputs.description || "",
        createdBy,
        new Date(),
      ]
    );

    if (parseInt(data.insertId) > 0) {
      const [inserteddata] = await database.query(
        `SELECT * FROM smsHeaderName WHERE id = '${parseInt(data.insertId)}'`
      );
      message = {
        message: "Successfully added the master",
        status: true,
        data: inserteddata,
      };
    } else {
      message = { message: "Failed to added the master", status: false };
    }

    res.json(message);
  } catch (e) {
    next(e);
  }
};

exports.UpdateMaster = async (req, res, next) => {
  try {
    const userInputs = await validate.AddUpdateMaster.validateAsync(req.body);
    const editedBy = 1; //logged in user

    let sql = `SELECT count(id) tid FROM smsHeaderName WHERE name = '${userInputs.name}' and institutionId = '${userInputs.institutionId}' and id != '${req.params.id}'`;
    const [rowname] = await database.query(sql);

    if (rowname.tid) {
      throw createErrors.Conflict(
        `"${userInputs.name}" already used, please choose another name!`
      );
    }

    const data = await database.query(
      `UPDATE smsHeaderName SET name = '${userInputs.name}', description = '${userInputs.description}', editedBy = ${editedBy}, lastEditedOn = NOW()  
      WHERE institutionId = '${userInputs.institutionId}' and id = '${req.params.id}';`
    );

    let message;
    if (data.affectedRows) {
      const [updateddata] = await database.query(
        `SELECT * FROM smsHeaderName WHERE institutionId = '${userInputs.institutionId}' and id = '${req.params.id}'`
      );
      message = {
        message: "Successfully update the master",
        status: true,
        data: updateddata,
      };
    } else {
      message = { message: "Failed to update the master", status: false };
    }

    res.status(200).send(message);
  } catch (e) {
    next(e);
  }
};

exports.DeleteMaster = async (req, res, next) => {
  let error = { message: "Failed to delete the master", status: false };
  try {
    const userQuerys = await validate.CheckInstitutionId.validateAsync(
      req.query
    );
    const institutionId = userQuerys.institutionId;

    const master = await database
      .query(
        `UPDATE smsHeaderName SET isDeleted = '1' WHERE institutionId = '${institutionId}' and id = '${req.params.id}';`
      )
      .then((query) => {
        // console.log(query);
        error = { message: "Succesfully deleted the master", status: true };
      });
    res.status(200).send({ message: error });
  } catch (e) {
    next(e);
  }
};

// const IsIndexExistInObj = (arr, index) => {
//   arr.forEach((element) => {
//     console.log(index);
//     if (element["index"] === index) {
//       element["key"] = "class-2-key-update";
//       element["value"] = "class-2-value-update";
//     }
//   });
//   return arr;
// };

const ManipulateObjectByOnIndex = (dbArr, postarr) => {
  let isExistIndexFlag = 0;
  const index = postarr[0]["index"];
  if (dbArr) {
    dbArr.forEach((element) => {
      if (element["index"] === index) {
        isExistIndexFlag = 1;
        element["key"] = postarr[0]["key"];
        element["value"] = postarr[0]["value"];
        element["rowindex"] = postarr[0]["rowindex"];
        element["datetime"] = new Date();
      }
    });
  } else {
    dbArr = [];
  }
  if (isExistIndexFlag === 0) {
    postarr[0]["datetime"] = new Date();
    dbArr.push(postarr[0]);
  }
  return JSON.stringify(dbArr);
};

const DeleteByIndex = (dbArr, index) => {
  for (var i = 0; i < dbArr.length; i++) {
    if (dbArr[i]["index"] === parseInt(index)) {
      dbArr.splice(i, 1);
    }
  }
  return JSON.stringify(dbArr);
};

/********************master header values**********************/
exports.AllMasterSubValue = async (req, res, next) => {
  try {
    const userQuerys = await validate.CheckInstitutionId.validateAsync(
      req.query
    );
    const userParams = await validate.CheckParams.validateAsync(req.params);
    const [AllHeaderValue] = await database.query(
      `SELECT id, name, description, headerValue FROM smsHeaderName WHERE institutionId = '${userQuerys.institutionId}' and id = '${userParams.id}'`
    );

    let msg = {
      message: "All master header value",
      status: true,
      data: AllHeaderValue,
    };
    res.json(msg);
  } catch (e) {
    next(e);
  }
};

exports.AddUpdateMasterSubValue = async (req, res, next) => {
  // console.log(typeof req.body.headerValue);
  let msg;
  try {
    const userParams = await validate.CheckParams.validateAsync(req.params);
    const userInputs = await validate.JsonHeaderValue.validateAsync(req.body);

    let headerValue = userInputs.headerValue;
    // if(typeof headerValue === 'object' || typeof headerValue === object){
    //   headerValue = JSON.stringify(headerValue);
    // }
    let sql = `UPDATE smsHeaderName SET headerValue = '${headerValue}' WHERE institutionId = '${userInputs.institutionId}' and id = '${userParams.id}'`;
    // console.log(sql);
    const data = await database.query(sql);

    if (data.affectedRows) {
      msg = {
        message: "Successfully added the header value",
        status: true,
        data: userInputs.headerValue,
      };
    } else {
      msg = { message: "Failed to add the header value", status: false };
    }
    res.status(200).send({ message: msg });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.AddUpdateMasterSubValue_Old = async (req, res, next) => {
  let error;
  try {
    const userParams = await validate.CheckParams.validateAsync(req.params);
    const userInputs = await validate.JsonHeaderValue.validateAsync(req.body);
    // const jsonIndex = await validate.JsonHeaderIndex.validateAsync(req.body);

    // console.log(typeof headerValue);

    const [rows] = await database.execute(
      `SELECT headerValue FROM smsHeaderName WHERE institutionId = '${userInputs.institutionId}' and id = '${userParams.id}'`
    );

    // console.log(typeof rows.headerValue, rows.headerValue);
    if (
      rows.headerValue !== undefined &&
      rows.headerValue !== "undefined" &&
      rows.headerValue == ""
    ) {
      const headerValue = JSON.stringify(userInputs.headerValue);
      // console.log("1--", headerValue);
      const data = await database.query(
        `UPDATE smsHeaderName SET headerValue = '${headerValue}' WHERE institutionId = '${userInputs.institutionId}' and id = '${userParams.id}';`
      );

      if (data.affectedRows) {
        error = {
          message: "Successfully added the header value",
          status: true,
          data: headerValue,
        };
      } else {
        error = { message: "Failed to add the header value", status: false };
      }
      res.status(200).send({ message: error });
    } else {
      const newHeaderValue = ManipulateObjectByOnIndex(
        JSON.parse(rows.headerValue),
        userInputs.headerValue
      );

      const data = await database.query(
        `UPDATE smsHeaderName SET headerValue = '${newHeaderValue}' WHERE institutionId = '${userInputs.institutionId}' and id = '${userParams.id}';`
      );

      if (data.affectedRows) {
        error = {
          message: "Successfully updated the header value",
          status: true,
          data: JSON.parse(newHeaderValue),
        };
      } else {
        error = { message: "Failed to update the header value", status: false };
      }
      res.status(200).send({ message: error });

      // res
      //   .status(200)
      //   .send({ message: "Succesfully updated header value", data: data });
    }
  } catch (e) {
    next(e);
  }
};

exports.DeleteMasterSubValue = async (req, res, next) => {
  // not in use
  // console.log(req.params);
  // console.log(req.query);
  try {
    const userParams = await validate.CheckParams.validateAsync(req.params);

    const userQuerys = await validate.CheckQueryForDelete.validateAsync(
      req.query
    );
    // console.log(userParams, userQuerys);
    const [rows] = await database.execute(
      `SELECT headerValue FROM smsHeaderName WHERE institutionId = '${userQuerys.institutionId}' and id = '${userParams.id}'`
    );

    // console.log(rows.headerValue);

    if (
      rows.headerValue !== undefined &&
      rows.headerValue !== "undefined" &&
      rows.headerValue != ""
    ) {
      // console.log(rows.headerValue);

      const newHeaderValue = DeleteByIndex(
        JSON.parse(rows.headerValue),
        userQuerys.index
      );

      const master = await database
        .query(
          `UPDATE smsHeaderName SET headerValue = '${newHeaderValue}' WHERE institutionId = '${userQuerys.institutionId}' and id = '${userParams.id}';`
        )
        .then((query) => {
          // console.log(query);
        });
      res.status(200).send({
        message: "Succesfully deleted the header value",
        data: master,
      });
    } else {
      res.status(200).send({ message: "Header value not found" });
    }
  } catch (e) {
    next(e);
  }
};

// const createErrors = require("http-errors");
const database = require("../../db");
const validate = require("../../helpers/joi.fee");

/********************fee date**********************/

exports.AllFee = async (req, res, next) => {
  try {
    const userQuerys = await validate.CheckInstitutionId.validateAsync(
      req.query
    );
    const institutionId = userQuerys.institutionId;
    let sql = `SELECT sfs.id, sfs.institutionId, sfs.fee, 
    sfs.classDegree as classDegreeJson, (select shn.name from smsHeaderName shn WHERE shn.id = json_extract(sfs.classDegree, '$.rowrefid')) as classDegreeHeader, 
    sfs.department as departmentJson, (select shn.name from smsHeaderName shn WHERE shn.id = json_extract(sfs.department, '$.rowrefid')) as departmentHeader, 
    sfs.feeType as feeTypeJson, (select shn.name from smsHeaderName shn WHERE shn.id = json_extract(sfs.feeType, '$.rowrefid')) as feeTypeHeader, 
    sfs.academicYear as academicYearJson, (select shn.name from smsHeaderName shn WHERE shn.id = json_extract(sfs.academicYear, '$.rowrefid')) as academicYearHeader, 
    sfs.boardUniversity as boardUniversityJson, (select shn.name from smsHeaderName shn WHERE shn.id = json_extract(sfs.boardUniversity, '$.rowrefid')) as boardUniversityHeader, 
    department, feeType, academicYear, boardUniversity, description, 
    DATE_FORMAT(sfs.createdOn, '%Y-%m-%d %h:%i:%s') as createdOn, DATE_FORMAT(sfs.lastEditedOn, '%Y-%m-%d %h:%i:%s') as lastEditedOn 
    FROM smsFeeStructure sfs WHERE sfs.isDeleted = '0' and sfs.institutionId = '${institutionId}' ORDER BY sfs.createdOn DESC`;
    // console.log(sql);
    const [...allfee] = await database.query(sql);
    // console.log(allfee);

    let message = {
      message: "All fee structure data",
      status: true,
      data: allfee,
    };

    res.status(200).json(message);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.getFeeById = async (req, res, next) => {
  try {
    const userQuery = await validate.CheckInstitutionId.validateAsync(
      req.query
    );
    const userParams = await validate.CheckParams.validateAsync(req.params);
    const institutionId = userQuery.institutionId;
    const id = userParams.id;

    const [...Register] = await database.query(
      `SELECT * FROM smsFeeStructure WHERE institutionId = '${institutionId}' and id = '${id}' ORDER BY createdOn DESC`
    );
    
    res.status(200).json({
      message: "Fee details",
      status: true,
      statuscode: 200,
      data: Register,
    });
  } catch (e) {
    next(e);
  }
};

exports.CreateFee = async (req, res, next) => {
  // console.log(typeof JSON.stringify(req.body.classDegree));
  let error;
  try {
    const createdBy = 1; //logged in user
    const userInputs = await validate.AddUpdateFee.validateAsync(req.body);
    const data = await database.execute(
      `INSERT INTO 
      smsFeeStructure(institutionId, classDegree, department, fee, feeType, academicYear, boardUniversity, description, createdBy, createdOn) 
    VALUES(?,?,?,?,?,?,?,?,?,?)`,
      [
        userInputs.institutionId || "",
        userInputs.classDegree || "",
        userInputs.department || "",
        userInputs.fee || "",
        userInputs.feeType || "",
        userInputs.academicYear || "",
        userInputs.boardUniversity || "",
        userInputs.description || "",
        createdBy,
        new Date(),
      ]
    );

    if (parseInt(data.insertId) > 0) {
      const [inserteddata] = await database.query(
        `SELECT * FROM smsFeeStructure WHERE id = '${parseInt(data.insertId)}'`
      );
      error = {
        message: "Successfully added the fee structure",
        status: true,
        data: inserteddata,
      };
    } else {
      error = { message: "Failed to add the fee structure", status: false };
    }

    res.json({ message: error });
  } catch (e) {
    next(e);
  }
};

exports.UpdateFee = async (req, res, next) => {
  // console.log(req.body.classDegree);
  let error;
  try {
    const userInputs = await validate.AddUpdateFee.validateAsync(req.body);
    const editedBy = 1; //logged in user

    let sql = `UPDATE smsFeeStructure SET 
    classDegree = '${userInputs.classDegree}', 
    department = '${userInputs.department}', 
    fee = '${userInputs.fee}', 
    feeType = '${userInputs.feeType}',
    academicYear = '${userInputs.academicYear}',
    boardUniversity = '${userInputs.boardUniversity}', 
    description = '${userInputs.description}',
    editedBy = ${editedBy}, lastEditedOn = NOW()  
    WHERE institutionId = '${userInputs.institutionId}' and id = '${
      req.params.id
    }'`;
    // console.log(sql);

    const data = await database.query(sql);
    console.log(data);
    if (data.affectedRows) {
      const [updateddata] = await database.query(
        `SELECT id, institutionId, classDegree, department, fee, feeType, academicYear, boardUniversity, description, createdBy, createdOn FROM smsFeeStructure WHERE id = '${req.params.id}'`
      );
      error = {
        message: "Succesfully updated the fee",
        status: true,
        data: updateddata,
      };
    } else {
      error = { message: "Failed to update fee structure", status: false };
    }

    res.status(200).send({ message: error });
  } catch (e) {
    next(e);
  }
};

exports.DeleteFee = async (req, res, next) => {
  // const institutionId = req.body.institutionId;
  try {
    const userQuerys = await validate.CheckInstitutionId.validateAsync(
      req.query
    );
    const userParams = await validate.CheckParams.validateAsync(req.params);
    const result = await database.query(
      `UPDATE smsFeeStructure SET isDeleted = '1' WHERE institutionId = '${userQuerys.institutionId}' and id = '${userParams.id}';`
    );

    let message;
    if(result.affectedRows==1){
      message = {
        message: "Succesfully deleted the fee structure",
        status: true,
        data: null,
      }
    } else {
      message = {
        message: "Failed to delete the fee structure",
        status: false,
        data: null,
      }
    }
    res.status(200).send(message);
  } catch (e) {
    // console.log(e);
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
    // console.log(dbArr);
    dbArr.forEach((element) => {
      if (element["index"] === index) {
        isExistIndexFlag = 1;
        element["feefor"] = postarr[0]["feefor"];
        element["description"] = postarr[0]["description"];
        element["amount"] = postarr[0]["amount"];
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

/********************fee values**********************/
exports.AllFeeSubValue = async (req, res, next) => {
  try {
    const userQuerys = await validate.CheckInstitutionId.validateAsync(
      req.query
    );
    const userParams = await validate.CheckParams.validateAsync(req.params);
    const [AllFeeValue] = await database.query(
      `SELECT id, fee, description, feeValue FROM smsFeeStructure WHERE institutionId = '${userQuerys.institutionId}' and id = '${userParams.id}'`
    );

    res
      .status(200)
      .send({ message: "All fee value", status: true, data: AllFeeValue });
    // res.json(JSON.parse(AllFeeValue.feeValue));
  } catch (e) {
    next(e);
  }
};

exports.AddUpdateFeeSubValue = async (req, res, next) => {
  let error;
  try {
    const userParams = await validate.CheckParams.validateAsync(req.params);
    const userInputs = await validate.JsonFeeValue.validateAsync(req.body);

    // const [rows] = await database.execute(
    //   `SELECT feeValue FROM smsFeeStructure WHERE institutionId = '${userInputs.institutionId}' and id = '${userParams.id}'`
    // );
    const feeValue = userInputs.feeValue;
    const data = await database.query(
      `UPDATE smsFeeStructure SET feeValue = '${feeValue}' WHERE institutionId = '${userInputs.institutionId}' and id = '${userParams.id}';`
    );

    if (data.affectedRows) {
      error = {
        message: "Successfully added the fee value",
        status: true,
        data: userInputs.feeValue,
      };
    } else {
      error = { message: "Failed to add the fee value", status: false };
    }
    res.status(200).send({ message: error });

    // if (
    //   rows.feeValue !== undefined &&
    //   rows.feeValue !== "undefined" &&
    //   rows.feeValue == ""
    // ) {
    //   const feeValue = JSON.stringify(userInputs.feeValue);
    //   const data = await database
    //     .query(
    //       `UPDATE smsFeeStructure SET feeValue = '${feeValue}' WHERE institutionId = '${userInputs.institutionId}' and id = '${userParams.id}';`
    //     );

    //   res
    //     .status(200)
    //     .send({ message: "Succesfully added the fee value", data: data });
    // } else {
    //   const newfeeValue = ManipulateObjectByOnIndex(
    //     JSON.parse(rows.feeValue),
    //     userInputs.feeValue
    //   );
    //   const data = await database
    //     .query(
    //       `UPDATE smsFeeStructure SET feeValue = '${newfeeValue}' WHERE institutionId = '${userInputs.institutionId}' and id = '${userParams.id}';`
    //     );

    //   res
    //     .status(200)
    //     .send({ message: "Succesfully updated fee value", data: data });
    // }
  } catch (e) {
    next(e);
  }
};

exports.DeleteFeeSubValue = async (req, res, next) => {
  // console.log(req.params);
  // console.log(req.query);
  try {
    const userParams = await validate.CheckParams.validateAsync(req.params);

    const userQuerys = await validate.CheckQueryForDelete.validateAsync(
      req.query
    );
    // console.log(userParams, userQuerys);
    const [rows] = await database.execute(
      `SELECT feeValue FROM smsFeeStructure WHERE institutionId = '${userQuerys.institutionId}' and id = '${userParams.id}'`
    );

    // console.log(rows.feeValue);

    if (
      rows.feeValue !== undefined &&
      rows.feeValue !== "undefined" &&
      rows.feeValue != ""
    ) {
      // console.log(rows.feeValue);

      const newfeeValue = DeleteByIndex(
        JSON.parse(rows.feeValue),
        userQuerys.index
      );

      const master = await database
        .query(
          `UPDATE smsFeeStructure SET feeValue = '${newfeeValue}' WHERE institutionId = '${userQuerys.institutionId}' and id = '${userParams.id}';`
        )
        .then((query) => {
          // console.log(query);
        });
      res.status(200).send({
        message: "Succesfully deleted the fee value",
        data: master,
      });
    } else {
      res.status(200).send({ message: "Fee value not found" });
    }
  } catch (e) {
    next(e);
  }
};

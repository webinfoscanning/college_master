const createErrors = require("http-errors");
const { object, exist } = require("joi");
const database = require("../../db");
const validate = require("../../helpers/joi.register");
const fetch = require('node-fetch');


/********************registration data**********************/

/************only accessable by superadmin************/

const configMasters = {
  config_academic: "Academic year",
  config_board: "Board university",
  config_category: "Category",
  config_class: "Class/Degree",
  config_depart: "Department/Medium",
  config_exptype: "Expense Type",
  config_feetype: "Fee type",
  config_location: "Location",
  config_paymode: "Payment Mode",
  config_section: "Section",
};

exports.AllRegister = async (req, res, next) => {
  try {
    const userQuerys = await validate.CheckInstitutionId.validateAsync(
      req.query
    );
    const institutionId = userQuerys.institutionId;

    let fields = `id, institutionId,name,description,address,email,isdeleted,isUnderMaintenance, DATE_FORMAT(createdOn, '%Y-%m-%d %h:%i:%s') as createdOn, DATE_FORMAT(lastEditedOn, '%Y-%m-%d %h:%i:%s') as lastEditedOn`;

    const [...result] = await database.query(
      `SELECT ${fields} FROM smsSchoolCollegeRegistration WHERE institutionId = '${institutionId}' ORDER BY createdOn DESC`
    );
    res.status(200).json({
      message: "All registered school/college",
      status: true,
      statuscode: 200,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

exports.getRegisterById = async (req, res, next) => {
  try {
    const userQuery = await validate.CheckInstitutionId.validateAsync(
      req.query
    );
    const userParams = await validate.CheckParams.validateAsync(req.params);
    const institutionId = userQuery.institutionId;
    const id = userParams.id;

    const [...Register] = await database.query(
      `SELECT * FROM smsSchoolCollegeRegistration WHERE institutionId = '${institutionId}' and id = '${id}' ORDER BY createdOn DESC`
    );
    //   console.log(Register);
    res.status(200).json({
      message: "Registeration details",
      status: true,
      statuscode: 200,
      data: Register,
    });
  } catch (e) {
    next(e);
  }
};

function generateInstitutionId(schoolName) {
  const schoolNameArr = schoolName.split(" ");
  let arr = [];
  schoolNameArr.forEach((element) => {
    arr.push(element.substring(0, 3));
  });
  return arr.join("");
}

exports.CreateRegister = async (req, res, next) => {
  try {
    const createdBy = 0; //logged in user (if super admin will create then <superadminId> other wise '0')
    const isDeleted = (isUnderMaintenance = 0);
    const userInputs = await validate.AddUpdateRegister.validateAsync(req.body);

    const institutionId =
      generateInstitutionId(userInputs.name)
        .toLocaleLowerCase()
        .substring(0, 7) + userInputs.phone.substring(10, 5);

    // console.log(institutionId);


    const url = req.protocol + "://" + req.get("host") + "/api/user/signup";
    //     const formData = {name: "Admin", email:userInputs.email, password:userInputs.password, institutionId:institutionId};
    //   const signUpResponse = await fetch(url, {
    //     method: "POST",
    //     body: JSON.stringify(formData),
    //     headers: { 'Content-Type': 'application/json' }
    //   })
    //   .then(res => res.json())
    //   .then(json => console.log(json));


    //     const signUpData = await signUpResponse.json();
    //     console.log(signUpData);
      
        


      


    var valueArr = [];
    Object.keys(configMasters).forEach(function (headerPrefix) {
      valueArr.push(
        `('${institutionId}','${headerPrefix}','${configMasters[headerPrefix]}','${configMasters[headerPrefix]}','0','0',NOW())`
      );
    });

    const [rowname] = await database.query(
      `SELECT count(id) tid FROM smsSchoolCollegeRegistration WHERE name = '${userInputs.name}' and institutionId = '${institutionId}'`
    );

    if (rowname.tid) {
      throw createErrors.Conflict(
        `"${userInputs.name}" already used, please choose another school name!`
      );
    }
    // console.log("1..");
    if (
      typeof institutionId === undefined ||
      typeof institutionId === "undefined" ||
      typeof institutionId == ""
    ) {
      throw createErrors.Conflict(
        `Institution Id is not generated, please contact to system administrator!`
      );
    }
    // console.log("2..");
    const response = await database.execute(
      `INSERT INTO 
      smsSchoolCollegeRegistration(institutionId,name,description,address,email,phone,isdeleted,isUnderMaintenance,createdBy,createdOn) 
    VALUES(?,?,?,?,?,?,?,?,?,?)`,
      [
        institutionId || "",
        userInputs.name || "",
        userInputs.description || "",
        userInputs.address || "",
        userInputs.email || "",
        userInputs.phone || "",
        isUnderMaintenance,
        isDeleted,
        createdBy,
        new Date(),
      ]
    );
    // console.log("3..");
    let message;
    // let configDetails;
    let schoolDetail;
    if (response.affectedRows === 1) {

        let postreq = {
            name: 'admin',
            email: userInputs.email,
            password: 'admin@123',
            institutionId: institutionId
        };
        
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(postreq),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
          .then(json => console.log(json));
           

      //   console.log("4..");
      let headerMasterSql = `insert into smsHeaderName(institutionId,headerPrefix,name,description,isdeleted,createdBy,createdOn) values ${valueArr}`;
      // console.log(headerMasterSql);
      await database.query(headerMasterSql);
     
     
      //   const [configResult] = await database.query(headerMasterSql);
      //   console.log(configResult);
      //   console.log("5..");
      //   console.log(configResult);
      //   if (configResult.affectedRows === 1) {
      //     const [configDetails] = await database.query(
      //       `SELECT * FROM smsHeaderName WHERE institutionId = '${institutionId}'`
      //     );
      //   }
      //   console.log("6..");

     
        const [schoolDetail] = await database.query(
        `SELECT id, institutionId,name,description,address,email,phone,isdeleted,isUnderMaintenance FROM smsSchoolCollegeRegistration WHERE id = '${parseInt(
          response.insertId
        )}'`
      );
      //   console.log("7..");
      message = {
        message: "Successfully registered",
        status: true,
        statuscode: 200,
        data: {registration:schoolDetail, schooladmin: postreq},
      };
    } else {
      console.log("8..");
      message = {
        message: "Failed to register",
        status: false,
        statuscode: 200,
        data: null,
      };
    }
    // console.log("9..");
    // console.log(message);
    res.json(message);
    // res.json({message: 'testing....'});
  } catch (e) {
    next(e);
  }
};

exports.UpdateRegister = async (req, res, next) => {
  try {
    const userInputs = await validate.AddUpdateRegister.validateAsync(req.body);
    const userParams = await validate.CheckParams.validateAsync(req.params);
    const editedBy = 1; //logged in user

    const response = await database.query(
      `UPDATE smsSchoolCollegeRegistration SET
      name = '${userInputs.name}',description = '${userInputs.description}',address = '${userInputs.address}',
      email = '${userInputs.name}',phone = '${userInputs.phone}',
      editedBy = ${editedBy}, lastEditedOn = NOW()  
      WHERE institutionId = '${userInputs.institutionId}' and id = '${userParams.id}';`
    );
    let message;
    if (response.affectedRows === 1) {
      const [result] = await database.query(
        `SELECT * FROM smsSchoolCollegeRegistration WHERE institutionId = '${userInputs.institutionId}' and id = '${userParams.id}'`
      );
      message = {
        message: "Successfully updated the registration",
        status: true,
        statuscode: 200,
        data: result,
      };
    } else {
      message = {
        message: "Failed to update the registration",
        status: false,
        statuscode: 200,
        data: null,
      };
    }

    res.status(200).send(message);
  } catch (e) {
    next(e);
  }
};

exports.DeleteRegister = async (req, res, next) => {
  const userQuerys = await validate.CheckInstitutionId.validateAsync(req.query);
  const userParams = await validate.CheckParams.validateAsync(req.params);
  const institutionId = userQuerys.institutionId;
  try {
    const result = await database.query(
      `UPDATE smsSchoolCollegeRegistration SET isDeleted = '1' WHERE institutionId = '${institutionId}' and id = '${userParams.id}';`
    );
    let message;
    if (result.affectedRows === 1) {
      message = {
        message: "Succesfully deleted the registration",
        status: true,
        statuscode: 200,
        data: null,
      };
    } else {
      message = {
        message: "Failed to delete the registration",
        status: false,
        statuscode: 200,
        data: null,
      };
    }
    res.status(200).send(message);
  } catch (e) {
    next(e);
  }
};

exports.UnderMaintenance = async (req, res, next) => {
  const userQuerys = await validate.CheckInstitutionId.validateAsync(req.query);
  const userParams = await validate.CheckParams.validateAsync(req.params);
  const institutionId = userQuerys.institutionId;
  try {
    const result = await database.query(
      `UPDATE smsSchoolCollegeRegistration SET isUnderMaintenance = '1' WHERE institutionId = '${institutionId}' and id = '${userParams.id}';`
    );
    let message;
    if (result.affectedRows === 1) {
      message = {
        message: "Now, it is under maintenance",
        status: true,
        statuscode: 200,
        data: null,
      };
    } else {
      message = {
        message: "Failed to make it under maintenance",
        status: false,
        statuscode: 200,
        data: null,
      };
    }
    res.status(200).send(message);
  } catch (e) {
    next(e);
  }
};

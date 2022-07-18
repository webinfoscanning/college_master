const createErrors = require("http-errors");
const { object } = require("joi");
const database = require("../../db");
const validate = require("../../helpers/joi.employee");

/********************employee date**********************/

exports.AllEmployee = async (req, res, next) => {
  try {
    const userQuerys = await validate.CheckInstitutionId.validateAsync(
      req.query
    );
    const institutionId = userQuerys.institutionId;

    let fields = `id, institutionId, employeeId, firstName, lastName,nickName,email,photo,department,location,title,employeeStatus,workingHours,workexperience,education,dependent, DATE_FORMAT(createdOn, '%Y-%m-%d %h:%i:%s') as createdOn, DATE_FORMAT(lastEditedOn, '%Y-%m-%d %h:%i:%s') as lastEditedOn`;

    const [...AllEmployee] = await database.query(
      `SELECT ${fields} FROM smsEmployee WHERE  isDeleted = '0' and institutionId = '${institutionId}' ORDER BY createdOn DESC`
    );
    res.status(200).json({
      message: "All employee data",
      status: true,
      statuscode: 200,
      data: AllEmployee,
    });
  } catch (e) {
    next(e);
  }
};

exports.getEmployeeById = async (req, res, next) => {
  try {
    const userQuery = await validate.CheckInstitutionId.validateAsync(req.query);
    const userParams = await validate.CheckParams.validateAsync(req.params);
    const institutionId = userQuery.institutionId;
    const id = userParams.id;

    // let fields = `id, institutionId, employeeId, firstName, lastName,nickName,email,department,location,title,employeeStatus,workingHours,workexperience,education,dependent, DATE_FORMAT(createdOn, '%Y-%m-%d %h:%i:%s') as createdOn, DATE_FORMAT(lastEditedOn, '%Y-%m-%d %h:%i:%s') as lastEditedOn`;

    const [...Employee] = await database.query(
      `SELECT * FROM smsEmployee WHERE  isDeleted = '0' and institutionId = '${institutionId}' and id = '${id}' ORDER BY createdOn DESC`
    );
    res.status(200).json({
      message: "Employee details",
      status: true,
      statuscode: 200,
      data: Employee,
    });
  } catch (e) {
    next(e);
  }
};


exports.CreateEmployee = async (req, res, next) => {
  try {
    const createdBy = 1; //logged in user
    const isDeleted = 0;
    const userInputs = await validate.AddUpdateEmployee.validateAsync(req.body);

    //dateOFExit (no need to insert)
    const result = await database.execute(
      `INSERT INTO 
      smsEmployee(institutionId,firstName,lastName,nickName,email,photo,department,location,title,reportingTo
        ,sourceOfHire,dateOfJoining,seatingLocation,employeeStatus,workPhone,employeeType,extension,role,panNo,dob
        ,personalAddress,residentialAddress,maritalStatus,jobDescription,summaryAddress,aboutMe,gender
        ,workingHours,workexperience,education,dependent
        ,isDeleted,createdBy,createdOn) 
    VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        userInputs.institutionId || "",
        userInputs.firstName || "",
        userInputs.lastName || "",
        userInputs.nickName || "",
        userInputs.email || "",
        userInputs.photo || "",
        userInputs.department || "",
        userInputs.location || "",
        userInputs.title || "",
        userInputs.reportingTo || "",
        userInputs.sourceOfHire || "",
        userInputs.dateOfJoining || "",
        userInputs.seatingLocation || "",
        userInputs.employeeStatus || "",
        userInputs.workPhone || "",
        userInputs.employeeType || "",
        userInputs.extension || "",
        userInputs.role || "",
        userInputs.panNo || "",
        userInputs.dob || "",
        userInputs.personalAddress || "",
        userInputs.residentialAddress || "",
        userInputs.maritalStatus || "",
        userInputs.jobDescription || "",
        userInputs.summaryAddress || "",
        userInputs.aboutMe || "",
        userInputs.gender || "",
        userInputs.workingHours || "",
        userInputs.workexperience || "",
        userInputs.education || "",
        userInputs.dependent || "",
        isDeleted,
        createdBy,
        new Date(),
      ]
    );

    let message;
    if (result.affectedRows === 1) {
      const employeeId =
        userInputs.institutionId.substring(0, 3) +
        userInputs.firstName.substring(0, 2) +
        parseInt(result.insertId);
      await database.query(
        `UPDATE smsEmployee SET employeeId = '${employeeId}'  
            WHERE id = '${parseInt(result.insertId)}';`
      );
      const [inserteddata] = await database.query(
        `SELECT * FROM smsEmployee WHERE id = '${parseInt(result.insertId)}'`
      );
      message = {
        message: "Successfully added the employee",
        status: true,
        statuscode: 200,
        data: inserteddata
      };
    } else {
      message = { 
        message: "Failed to added the employee", 
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

exports.UpdateEmployee = async (req, res, next) => {
  try {
    const userInputs = await validate.AddUpdateEmployee.validateAsync(req.body);
    const editedBy = 1; //logged in user

    const result = await database.query(
      `UPDATE smsEmployee SET 
      firstName = '${userInputs.firstName}',lastName = '${userInputs.lastName}',nickName = '${userInputs.nickName}',email = '${userInputs.email}',
      photo = '${userInputs.photo}',
      department = '${userInputs.department}',location = '${userInputs.location}',title = '${userInputs.title}',
      reportingTo = '${userInputs.reportingTo}',sourceOfHire = '${userInputs.sourceOfHire}',
      dateOfJoining = '${userInputs.dateOfJoining}',seatingLocation = '${userInputs.seatingLocation}',
      employeeStatus = '${userInputs.employeeStatus}',workPhone = '${userInputs.workPhone}',employeeType = '${userInputs.employeeType}',
      extension = '${userInputs.extension}',role = '${userInputs.role}',panNo = '${userInputs.panNo}',dob = '${userInputs.dob}',
      personalAddress = '${userInputs.personalAddress}',residentialAddress = '${userInputs.residentialAddress}',
      maritalStatus = '${userInputs.maritalStatus}',jobDescription = '${userInputs.jobDescription}',summaryAddress = '${userInputs.summaryAddress}',aboutMe = '${userInputs.aboutMe}',gender = '${userInputs.gender}',
      workingHours = '${userInputs.workingHours}',workexperience = '${userInputs.workexperience}',education = '${userInputs.education}',dependent = '${userInputs.dependent}',

      dateOFExit = '${userInputs.dateOFExit}', editedBy = ${editedBy}, lastEditedOn = NOW()  
      WHERE institutionId = '${userInputs.institutionId}' and id = '${req.params.id}';`
    );
    let message;
    // console.log(data);
    if (result.affectedRows === 1) {
      const [updateddata] = await database.query(
        `SELECT * FROM smsEmployee WHERE institutionId = '${userInputs.institutionId}' and id = '${req.params.id}'`
      );
      message = {
        message: "Successfully update the employee",
        status: true,
        statuscode: 200,
        data: updateddata,
      };
    } else {
      message = { 
        message: "Failed to update the employee", 
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

exports.DeleteEmployee = async (req, res, next) => {
    const userQuerys = await validate.CheckInstitutionId.validateAsync(
      req.query
    );
    const institutionId = userQuerys.institutionId;
        try {

    const result = await database.query(
      `UPDATE smsEmployee SET isDeleted = '1' WHERE institutionId = '${institutionId}' and id = '${req.params.id}';`
    );
    let message;
    if (result.affectedRows === 1) {
      message = {
        message: "Succesfully deleted the employee",
        status: true,
        statuscode: 200,
        data:null
      };
    } else {
      message = { 
        message: "Failed to delete the employee", 
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


/**********************************Employee Experience***********************************************/


exports.AllExprienceEmployee = async (req, res, next) => {
    try {
      const userQuerys = await validate.CheckInstitutionId.validateAsync(
        req.query
      );
      const userParams = await validate.CheckParams.validateAsync(
        req.params
      );
      let fields = `id,institutionId,empRefId,preCompName,jobTitle,fromDate,toDate,jobDescription, DATE_FORMAT(createdOn, '%Y-%m-%d %h:%i:%s') as createdOn, DATE_FORMAT(lastEditedOn, '%Y-%m-%d %h:%i:%s') as lastEditedOn`;
      const [...AllExpEmployee] = await database.query(
        `SELECT ${fields} FROM smsEmpWorkExpe WHERE  isDeleted = '0' and institutionId = '${userQuerys.institutionId}' and empRefId = '${userParams.id}' ORDER BY createdOn DESC`
      );
      res.status(200).json({
        message: "All experience of employee",
        status: true,
        statuscode: 200,
        data: AllExpEmployee,
      });
    } catch (e) {
      next(e);
    }
  };
  

// exports.AddExprienceEmployee = async (req, res, next) => {
//   try {
//     const createdBy = 1; //logged in user
//     const isDeleted = 0;
//     const userInputs = await validate.AddUpdateExperience.validateAsync(
//       req.body
//     );
//     // const userParams = await validate.CheckParams.validateAsync(req.params);
//     const result = await database.execute(
//       `INSERT INTO 
//           smsEmpWorkExpe(empRefId,institutionId,preCompName,jobTitle,fromDate,toDate,jobDescription,isDeleted,createdBy,createdOn) 
//         VALUES(?,?,?,?,?,?,?,?,?,?)`,
//       [
//         userInputs.empRefId || "",
//         userInputs.institutionId || "",
//         userInputs.preCompName || "",
//         userInputs.jobTitle || "",
//         userInputs.fromDate || "",
//         userInputs.toDate || "",
//         userInputs.jobDescription || "",
//         isDeleted,
//         createdBy,
//         new Date(),
//       ]
//     );

//     let message;
//     if (result.affectedRows === 1) {
//       const [inserteddata] = await database.query(
//         `SELECT * FROM smsEmpWorkExpe WHERE id = '${parseInt(result.insertId)}'`
//       );
//       message = {
//         message: "Successfully added the employee experience",
//         status: true,
//         statuscode: 200,
//         data: inserteddata,
//       };
//     } else {
//       message = {
//         message: "Failed to added the employee experience",
//         status: false,
//         statuscode: 200,
//         data:null
//       };
//     }

//     res.json(message);
//   } catch (e) {
//     next(e);
//   }
// };

// exports.UpdateExprienceEmployee = async (req, res, next) => {
//   try {
//     const userInputs = await validate.AddUpdateExperience.validateAsync(
//       req.body
//     );
//     const userParams = await validate.CheckParams.validateAsync(req.params);
//     const editedBy = 1; //logged in user

//     const result = await database.query(
//       `UPDATE smsEmpWorkExpe SET 
//         institutionId = '${userInputs.institutionId}',preCompName = '${userInputs.preCompName}',
//         jobTitle = '${userInputs.jobTitle}',fromDate = '${userInputs.fromDate}',toDate = '${userInputs.toDate}',
//         jobDescription = '${userInputs.jobDescription}',editedBy = ${editedBy}, lastEditedOn = NOW()  
//         WHERE institutionId = '${userInputs.institutionId}' and empRefId = '${userInputs.empRefId}' and id = '${userParams.id}';`
//     );
//     let message;
//     //   console.log(data);
//     if (result.affectedRows === 1) {
//       const [updateddata] = await database.query(
//         `SELECT * FROM smsEmpWorkExpe WHERE institutionId = '${userInputs.institutionId}' and id = '${userParams.id}'`
//       );
//       message = {
//         message: "Successfully update the employee experience",
//         status: true,
//         statuscode: 200,
//         data: updateddata,
//       };
//     } else {
//       message = {
//         message: "Failed to update the employee experience",
//         status: false,
//         statuscode: 200,
//         data:null
//       };
//     }

//     res.status(200).send(message);
//   } catch (e) {
//     next(e);
//   }
// };

// exports.DeleteExprienceEmployee = async (req, res, next) => {
//   try {
//     const userQuerys = await validate.CheckInstitutionAndEmpRefId.validateAsync(
//       req.query
//     );
//     const userParams = await validate.CheckParams.validateAsync(req.params);

//     const result = await database.query(
//       `UPDATE smsEmpWorkExpe SET isDeleted = '1' WHERE institutionId = '${userQuerys.institutionId}' and empRefId = '${userQuerys.empRefId}' and id = '${userParams.id}';`
//     );
//     let message;
//     if (result.affectedRows === 1) {
//       message = {
//         message: "Succesfully deleted the employee experience",
//         status: true,
//         statuscode: 200,
//         data:null
//       };
//     } else {
//       message = {
//         message: "Failed to delete the employee experience",
//         status: false,
//         statuscode: 200,
//         data:null
//       };
//     }
//     res.status(200).send(message);
//   } catch (e) {
//     next(e);
//   }
// };


// /******************************************Employee Education***********************************************/

// exports.AllEducationEmployee = async (req, res, next) => {
//     try {
//       const userQuerys = await validate.CheckInstitutionId.validateAsync(
//         req.query
//       );
//       const userParams = await validate.CheckParams.validateAsync(
//         req.params
//       );
//       let fields = `id,empRefId,institutionId,collageName,diplomaDegree,fieldOfStudy,dateOfCompletion,additionalNotes,interested,aggregate, DATE_FORMAT(createdOn, '%Y-%m-%d %h:%i:%s') as createdOn, DATE_FORMAT(lastEditedOn, '%Y-%m-%d %h:%i:%s') as lastEditedOn`;
//       const [...AllEduEmployee] = await database.query(
//         `SELECT ${fields} FROM smsEmpEducation WHERE  isDeleted = '0' and institutionId = '${userQuerys.institutionId}' and empRefId = '${userParams.id}' ORDER BY createdOn DESC`
//       );
//       res.status(200).json({
//         message: "All education of employee",
//         status: true,
//         statuscode: 200,
//         data: AllEduEmployee,
//       });
//     } catch (e) {
//       next(e);
//     }
//   };



// exports.AddEducationEmployee = async (req, res, next) => {
//     try {
//       const createdBy = 1; //logged in user
//       const isDeleted = 0;
//       const userInputs = await validate.AddUpdateEducation.validateAsync(
//         req.body
//       );
//       const result = await database.execute(
//         `INSERT INTO 
//         smsEmpEducation(empRefId,institutionId,collageName,diplomaDegree,fieldOfStudy,dateOfCompletion,additionalNotes,interested,aggregate,isDeleted,createdBy,createdOn) 
//           VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
//         [
//           userInputs.empRefId || "",
//           userInputs.institutionId || "",
//           userInputs.collageName || "",
//           userInputs.diplomaDegree || "",
//           userInputs.fieldOfStudy || "",
//           userInputs.dateOfCompletion || "",
//           userInputs.additionalNotes || "",
//           userInputs.interested || "",
//           userInputs.aggregate || "",
//           isDeleted,
//           createdBy,
//           new Date(),
//         ]
//       );
  
//       let message;
//       if (result.affectedRows === 1) {
//         const [inserteddata] = await database.query(
//           `SELECT * FROM smsEmpEducation WHERE id = '${parseInt(result.insertId)}'`
//         );
//         message = {
//           message: "Successfully added the employee education",
//           status: true,
//           statuscode: 200,
//           data: inserteddata,
//         };
//       } else {
//         message = {
//           message: "Failed to added the employee education",
//           status: false,
//           statuscode: 200,
//           data:null
//         };
//       }
  
//       res.json(message);
//     } catch (e) {
//       next(e);
//     }
//   };
  
//   exports.UpdateEducationEmployee = async (req, res, next) => {
//     try {
//       const userInputs = await validate.AddUpdateEducation.validateAsync(
//         req.body
//       );
//       const userParams = await validate.CheckParams.validateAsync(req.params);
//       const editedBy = 1; //logged in user
    
//       const result = await database.query(
//         `UPDATE smsEmpEducation SET 
//         empRefId = '${userInputs.empRefId}',institutionId = '${userInputs.institutionId}',collageName = '${userInputs.collageName}',
//         diplomaDegree = '${userInputs.diplomaDegree}',fieldOfStudy = '${userInputs.fieldOfStudy}',dateOfCompletion = '${userInputs.dateOfCompletion}',
//         additionalNotes = '${userInputs.additionalNotes}',interested = '${userInputs.interested}',aggregate = '${userInputs.aggregate}',
//         editedBy = ${editedBy}, lastEditedOn = NOW()  
//           WHERE institutionId = '${userInputs.institutionId}' and empRefId = '${userInputs.empRefId}' and id = '${userParams.id}';`
//       );
//       let message;
//       //   console.log(data);
//       if (result.affectedRows === 1) {
//         const [updateddata] = await database.query(
//           `SELECT * FROM smsEmpEducation WHERE institutionId = '${userInputs.institutionId}' and id = '${userParams.id}'`
//         );
//         message = {
//           message: "Successfully update the employee education",
//           status: true,
//           statuscode: 200,
//           data: updateddata,
//         };
//       } else {
//         message = {
//           message: "Failed to update the employee education",
//           status: false,
//           statuscode: 200,
//           data:null
//         };
//       }
  
//       res.status(200).send(message);
//     } catch (e) {
//       next(e);
//     }
//   };
  
//   exports.DeleteEducationEmployee = async (req, res, next) => {
//     try {
//       const userQuerys = await validate.CheckInstitutionAndEmpRefId.validateAsync(
//         req.query
//       );
//       const userParams = await validate.CheckParams.validateAsync(req.params);
  
//       const result = await database.query(
//         `UPDATE smsEmpEducation SET isDeleted = '1' WHERE institutionId = '${userQuerys.institutionId}' and empRefId = '${userQuerys.empRefId}' and id = '${userParams.id}';`
//       );
//       let message;
//       if (result.affectedRows === 1) {
//         message = {
//           message: "Succesfully deleted the employee education",
//           status: true,
//           statuscode: 200,
//           data:null
//         };
//       } else {
//         message = {
//           message: "Failed to delete the employee education",
//           status: false,
//           statuscode: 200,
//           data:null
//         };
//       }
//       res.status(200).send(message);
//     } catch (e) {
//       next(e);
//     }
//   };

//   /********************************************Employee Dependent*************************************************/

//   exports.AllDependentEmployee = async (req, res, next) => {
//     try {
//       const userQuerys = await validate.CheckInstitutionId.validateAsync(
//         req.query
//       );
//       const userParams = await validate.CheckParams.validateAsync(
//         req.params
//       );
//       let fields = `id,empRefId,institutionId,name,relationship,dob, DATE_FORMAT(createdOn, '%Y-%m-%d %h:%i:%s') as createdOn, DATE_FORMAT(lastEditedOn, '%Y-%m-%d %h:%i:%s') as lastEditedOn`;
//       const [...AllDepEmployee] = await database.query(
//         `SELECT ${fields} FROM smsEmpDependent WHERE  isDeleted = '0' and institutionId = '${userQuerys.institutionId}' and empRefId = '${userParams.id}' ORDER BY createdOn DESC`
//       );
//       res.status(200).json({
//         message: "All dependent of employee",
//         status: true,
//         statuscode: 200,
//         data: AllDepEmployee,
//       });
//     } catch (e) {
//       next(e);
//     }
//   };

// exports.AddDependentEmployee = async (req, res, next) => {
//     try {
//       const createdBy = 1; //logged in user
//       const isDeleted = 0;
//       const userInputs = await validate.AddUpdateDependent.validateAsync(
//         req.body
//       );
//       const result = await database.execute(
//         `INSERT INTO 
//         smsEmpDependent(empRefId,institutionId,name,relationship,dob,isDeleted,createdBy,createdOn) 
//           VALUES(?,?,?,?,?,?,?,?)`,
//         [
//           userInputs.empRefId || "",
//           userInputs.institutionId || "",
//           userInputs.name || "",
//           userInputs.relationship || "",
//           userInputs.dob || "",
//           isDeleted,
//           createdBy,
//           new Date(),
//         ]
//       );
  
//       let message;
//       if (result.affectedRows === 1) {
//         const [inserteddata] = await database.query(
//           `SELECT * FROM smsEmpDependent WHERE id = '${parseInt(result.insertId)}'`
//         );
//         message = {
//           message: "Successfully added the employee dependent",
//           status: true,
//           statuscode: 200,
//           data: inserteddata,
//         };
//       } else {
//         message = {
//           message: "Failed to added the employee dependent",
//           status: false,
//           statuscode: 200,
//           data:null
//         };
//       }
  
//       res.json(message);
//     } catch (e) {
//       next(e);
//     }
//   };
  
//   exports.UpdateDependentEmployee = async (req, res, next) => {
//     try {
//       const userInputs = await validate.AddUpdateDependent.validateAsync(
//         req.body
//       );
//       const userParams = await validate.CheckParams.validateAsync(req.params);
//       const editedBy = 1; //logged in user
//       const result = await database.query(
//         `UPDATE smsEmpDependent SET 
//           institutionId = '${userInputs.institutionId}',name = '${userInputs.name}',
//           relationship = '${userInputs.relationship}',dob = '${userInputs.dob}',editedBy = ${editedBy}, lastEditedOn = NOW()  
//           WHERE institutionId = '${userInputs.institutionId}' and empRefId = '${userInputs.empRefId}' and id = '${userParams.id}';`
//       );
//       let message;
//       //   console.log(data);
//       if (result.affectedRows === 1) {
//         const [updateddata] = await database.query(
//           `SELECT * FROM smsEmpDependent WHERE institutionId = '${userInputs.institutionId}' and id = '${userParams.id}'`
//         );
//         message = {
//           message: "Successfully update the employee dependent",
//           status: true,
//           statuscode: 200,
//           data: updateddata,
//         };
//       } else {
//         message = {
//           message: "Failed to update the employee dependent",
//           status: false,
//           statuscode: 200,
//           data:null
//         };
//       }
  
//       res.status(200).send(message);
//     } catch (e) {
//       next(e);
//     }
//   };
  
//   exports.DeleteDependentEmployee = async (req, res, next) => {
//     try {
//       const userQuerys = await validate.CheckInstitutionAndEmpRefId.validateAsync(
//         req.query
//       );
//       const userParams = await validate.CheckParams.validateAsync(req.params);
  
//       const result = await database.query(
//         `UPDATE smsEmpDependent SET isDeleted = '1' WHERE institutionId = '${userQuerys.institutionId}' and empRefId = '${userQuerys.empRefId}' and id = '${userParams.id}';`
//       );
//       let message;
//       if (result.affectedRows === 1) {
//         message = {
//           message: "Succesfully deleted the employee dependent",
//           status: true,
//           statuscode: 200,
//           data:null
//         };
//       } else {
//         message = {
//           message: "Failed to delete the employee dependent",
//           status: false,
//           statuscode: 200,
//           data:null
//         };
//       }
//       res.status(200).send(message);
//     } catch (e) {
//       next(e);
//     }
//   };
  
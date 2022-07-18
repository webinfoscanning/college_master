// const createErrors = require("http-errors");
const { date } = require("joi");
const database = require("../../db");
const validate = require("../../helpers/joi.map");

/********************Map date**********************/

exports.AllMap = async (req, res, next) => {
  try {
    const userQuerys = await validate.CheckInstitutionId.validateAsync(
      req.query
    );
    const institutionId = userQuerys.institutionId;
    const [...allMap] = await database.query(
      `SELECT id, institutionId, classId, department, academicYear, subjectDetails, DATE_FORMAT(createdOn, '%Y-%m-%d %h:%i:%s') as createdOn, DATE_FORMAT(lastEditedOn, '%Y-%m-%d %h:%i:%s') as lastEditedOn FROM smsClassSubjectDetails WHERE isDeleted = '0' and institutionId = '${institutionId}' ORDER BY createdOn DESC`
    );
    res.status(200).json({
      message: "All master data for map",
      status: true,
      data: allMap,
    });
  } catch (e) {
    next(e);
  }
};

exports.CreateMap = async (req, res, next) => {
  try {
    const createdBy = 1; //logged in user
    const userInputs = await validate.AddUpdateMap.validateAsync(req.body);
    let isDeleted = 0;
    const data = await database.execute(
      `INSERT INTO 
      smsClassSubjectDetails(institutionId, classId, department, academicYear,section, board, isDeleted, createdBy, createdOn) 
    VALUES(?,?,?,?,?,?,?,?,?)`,
      [
        userInputs.institutionId || "",
        userInputs.classId || "",
        userInputs.department || "",
        userInputs.academicYear || "",
        userInputs.section || "",
        userInputs.board || "",
        isDeleted,
        createdBy,
        new Date(),
      ]
    );
    let message;
    if (parseInt(data.insertId) > 0) {
      const [inserteddata] = await database.query(
        `SELECT id, institutionId, classId, department, academicYear, section, board, createdBy, DATE_FORMAT(createdOn, '%Y-%m-%d %h:%i:%s') as createdOn FROM smsClassSubjectDetails WHERE id = '${parseInt(
          data.insertId
        )}'`
      );
      message = {
        message: "Successfully added the master for map",
        status: true,
        data: inserteddata,
      };
    } else {
      message = { message: "Failed to add the master for map", status: false };
    }

    res.status(200).json({ message: message });
  } catch (e) {
    next(e);
  }
};

exports.UpdateMap = async (req, res, next) => {
  console.log(req.params.id);

  try {
    const userInputs = await validate.AddUpdateMap.validateAsync(req.body);
    const userParams = await validate.CheckParams.validateAsync(req.params);
    const editedBy = 1; //logged in user

    const sql = `UPDATE smsClassSubjectDetails SET 
    classId = '${userInputs.classId}', 
    department = '${userInputs.department}', 
    academicYear = '${userInputs.academicYear}',
    section = '${userInputs.section}',
    board = '${userInputs.board}', 
    editedBy = ${editedBy}, lastEditedOn = NOW()  
    WHERE institutionId = '${userInputs.institutionId}' and id = '${userParams.id}'`;

    const result = await database.execute(sql);
    let message;
    if (result.affectedRows) {
      const [inserteddata] = await database.query(
        `SELECT id, institutionId, classId, department, academicYear, section, board, createdBy, DATE_FORMAT(createdOn, '%Y-%m-%d %h:%i:%s') as createdOn FROM smsClassSubjectDetails WHERE id = '${userParams.id}'`
      );
      message = {
        message: "Successfully updated the master for map",
        status: true,
        data: inserteddata,
      };
    } else {
      message = {
        message: "Failed to update the master for map",
        status: false,
      };
    }

    res.status(200).send({ message: message });
  } catch (e) {
    next(e);
  }
};

exports.DeleteMap = async (req, res, next) => {
  try {
    const userQuerys = await validate.CheckInstitutionId.validateAsync(
      req.query
    );
    const userParams = await validate.CheckParams.validateAsync(req.params);
    const institutionId = userQuerys.institutionId;
    const sql = `UPDATE smsClassSubjectDetails SET isDeleted = '1' WHERE institutionId = '${institutionId}' and id = '${userParams.id}';`;
    // console.log(sql);
    const result = await database.query(sql);
    // console.log(data);
    let message;
    if (result.affectedRows) {
      // const [inserteddata] = await database.query(
      //   `SELECT id, institutionId, classId, department, academicYear, createdBy, DATE_FORMAT(createdOn, '%Y-%m-%d %h:%i:%s') as createdOn FROM smsClassSubjectDetails WHERE id = '${userParams.id}'`
      // );
      message = {
        message: "Successfully deleted the master for map",
        status: true,
        //   data: inserteddata,
      };
    } else {
      message = {
        message: "Failed to delete the master for map",
        status: false,
      };
    }
    res.status(200).send({ message: message });
  } catch (e) {
    next(e);
  }
};

// const ManipulateSubjectDetailsByIndex = (dbArr, postarr) => {
//   let isExistIndexFlag = 0;
//   const index = postarr[0]["index"];

//   if (dbArr) {
//     dbArr.forEach((element) => {
//       if (element["index"] === index) {
//         isExistIndexFlag = 1;
//         element["code"] = postarr[0]["code"];
//         element["name"] = postarr[0]["name"];
//         element["description"] = postarr[0]["description"];
//         element["rowindex"] = postarr[0]["rowindex"];
//       }
//     });
//   } else {
//     dbArr = [];
//   }
//   if (isExistIndexFlag === 0) {
//     dbArr.push(postarr[0]);
//   }
//   return JSON.stringify(dbArr);
// };

// const DeleteByIndex = (dbArr, index) => {
//   for (var i = 0; i < dbArr.length; i++) {
//     if (dbArr[i]["index"] === parseInt(index)) {
//       dbArr.splice(i, 1);
//     }
//   }
//   return JSON.stringify(dbArr);
// };

/********************Subject details values**********************/
exports.AllSubjectDetails = async (req, res, next) => {
  try {
    const userQuerys = await validate.CheckInstitutionId.validateAsync(
      req.query
    );
    const userParams = await validate.CheckParams.validateAsync(req.params);

    const [result] = await database.query(
      `SELECT subjectDetails FROM smsClassSubjectDetails WHERE institutionId = '${userQuerys.institutionId}' and id = '${userParams.id}'`
    );
    let message = {
      message: "All subject details data for map",
      status: true,
      statuscode: 200,
      data: result ? result : null,
    };
    res.status(200).json(message);
  } catch (e) {
    next(e);
  }
};

exports.AddUpdateSubjectDetails = async (req, res, next) => {
  try {
    const userParams = await validate.CheckParams.validateAsync(req.params);
    const userInputs = await validate.JsonSubjectDetails.validateAsync(
      req.body
    );

    const subjectDetails = userInputs.subjectDetails;
    const sql = `UPDATE smsClassSubjectDetails SET subjectDetails = '${subjectDetails}' WHERE institutionId = '${userInputs.institutionId}' and id = '${userParams.id}'`;
    const responce = await database.query(sql);
    let message;
    // console.log(responce);
    if (responce.affectedRows === 1) {
      const [result] = await database.query(
        `SELECT * FROM smsClassSubjectDetails WHERE institutionId = '${userInputs.institutionId}' and id = '${userParams.id}'`
      );
      message = {
        message: "Succesfully added subject details",
        status: true,
        statuscode: 200,
        data: result,
      };
    } else {
      message = {
        message: "Succesfully added subject details",
        status: true,
        statuscode: 200,
        data: null,
      };
    }
    res.status(200).send(message);
  } catch (e) {
    next(e);
  }
};

// no need to use delete only add or update whole data of subject
exports.DeleteSubjectDetails = async (req, res, next) => {
  //   console.log(req.params);
  //   console.log(req.query);
  try {
    const userParams = await validate.CheckParams.validateAsync(req.params);

    const userQuerys = await validate.CheckQueryForDelete.validateAsync(
      req.query
    );
    // console.log(userParams, userQuerys);
    let sql = `SELECT subjectDetails FROM smsClassSubjectDetails WHERE institutionId = '${userQuerys.institutionId}' and id = '${userParams.id}'`;
    // console.log(sql);
    const [rows] = await database.execute(sql);

    // console.log(rows);

    if (
      rows.subjectDetails !== undefined &&
      rows.subjectDetails !== "undefined" &&
      rows.subjectDetails != ""
    ) {
      //   console.log(
      //     "subjectDetails--",
      //     typeof rows.subjectDetails,
      //     rows.subjectDetails
      //   );

      const newSubjectDetails = DeleteByIndex(
        rows.subjectDetails,
        userQuerys.index
      );

      //   console.log("newSubjectDetails--", newSubjectDetails);

      let sql = `UPDATE smsClassSubjectDetails SET subjectDetails = '${newSubjectDetails}' WHERE institutionId = '${userQuerys.institutionId}' and id = '${userParams.id}';`;
      // console.log(sql);
      const data = await database.query(sql);

      res.status(200).send({
        message: "Succesfully deleted the subject detail",
        status: true,
        data: JSON.parse(newSubjectDetails),
      });
    } else {
      res
        .status(200)
        .send({ message: "Subject detail not found", status: false });
    }
  } catch (e) {
    next(e);
  }
};

exports.listAllClasses = async (req, res, next) => {
  try {
    const userQuery = await validate.CheckInstitutionId.validateAsync(
      req.query
    );
    const sql = `select scsd.id
    ,scsd.subjectDetails
    ,scsd.classId
    ,scsd.department
    ,scsd.academicYear
    ,scsd.section
    ,scsd.board
    ,(select shn.name from smsHeaderName shn WHERE shn.id = json_extract(scsd.classId, '$.rowrefid')) as classHeader
    ,(select shn.name from smsHeaderName shn WHERE shn.id = json_extract(scsd.department, '$.rowrefid')) as departmentHeader
    ,(select shn.name from smsHeaderName shn WHERE shn.id = json_extract(scsd.academicYear, '$.rowrefid')) as academicYearHeader
    ,(select shn.name from smsHeaderName shn WHERE shn.id = json_extract(scsd.section, '$.rowrefid')) as sectionHeader
    ,(select shn.name from smsHeaderName shn WHERE shn.id = json_extract(scsd.board, '$.rowrefid')) as boardHeader
    from smsClassSubjectDetails scsd where institutionId = '${userQuery.institutionId}'`;
    // console.log(sql);
    const [...result] = await database.query(sql);

    let newResult = [];
    result.forEach((element) => {
      let subjectDetails = element.subjectDetails;
      if (subjectDetails) {
        const obj = Object.keys(subjectDetails);
        obj.forEach((key, index) => {
          newResult.push({
            mappedClassSubRefId: element.id,
            classHeader: element.classHeader,
            classJson: element.classId,
            departmentJson: element.department,
            academicYearJson: element.academicYear,
            sectionJson: element.section,
            boardJson: element.board,
            departmentHeader: element.departmentHeader,
            academicYearHeader: element.academicYearHeader,
            sectionHeader: element.sectionHeader,
            subjectCode: subjectDetails[key]["subHeader"]
              ? subjectDetails[key]["subHeader"]
              : null,
            subjectName: subjectDetails[key]["subName"]
              ? subjectDetails[key]["subName"]
              : null,
            subjectJson: {
              userId: subjectDetails[key]["userId"],
              subHeader: subjectDetails[key]["subHeader"],
              subName: subjectDetails[key]["subName"],
              subDescrition: subjectDetails[key]["subDescrition"],
              rowrefid: subjectDetails[key]["rowrefid"],
              createdDate: subjectDetails[key]["createdDate"],
            },
          });
        });
      }
    });
    res.status(200).json({
      message: "All class list with subject",
      status: true,
      statuscode: 200,
      data: newResult,
    });
  } catch (e) {
    next(e);
  }
};


exports.listOfAllSubjects = async (req, res, next) => {
  try {
    const userQuery = await validate.CheckInstitutionId.validateAsync(
      req.query
    );
    const sql = `select scsd.id,scsd.classId
    from smsClassSubjectDetails scsd where institutionId = '${userQuery.institutionId}'`;
    // console.log(sql);
    const [...result] = await database.query(sql);

    res.status(200).json({
      message: "All class list with subject",
      status: true,
      statuscode: 200,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};




exports.MapFacultyToSubject = async (req, res, next) => {
  console.log(req.body);
  try {
    const createdBy = (editedBy = 1); //logged in user
    const userInputs = await validate.AddFacultyToSubject.validateAsync(
      req.body
    );

    // let isDeleted = 0;

    const [alreadyMapped] = await database.query(
      `SELECT count(empRefId) as total FROM smsMapFacultyToSubject WHERE institutionId = '${userInputs.institutionId}' and empRefId = '${userInputs.empRefId}'`
    );
    let result;
    // console.log(alreadyMapped);
    if (parseInt(alreadyMapped.total) == 0) {
      result = await database.execute(
        `INSERT INTO 
      smsMapFacultyToSubject(empRefId, institutionId, mappedSubject, createdBy, createdOn) 
    VALUES(?,?,?,?,?)`,
        [
          userInputs.empRefId || "",
          userInputs.institutionId || "",
          userInputs.mappedSubject || "",
          createdBy,
          new Date(),
        ]
      );
    } else {
      let sql = `UPDATE smsMapFacultyToSubject SET mappedSubject = '${userInputs.mappedSubject}', editedBy = ${editedBy}, lastEditedOn = NOW() WHERE institutionId = '${userInputs.institutionId}' and empRefId = '${userInputs.empRefId}';`;
      // console.log(sql);
      result = await database.query(sql);
    }
    // console.log(result);
    let message;
    if (result.affectedRows === 1) {
      const [inserteddata] = await database.query(
        `SELECT id, empRefId, institutionId, mappedSubject, createdBy, DATE_FORMAT(createdOn, '%Y-%m-%d %h:%i:%s') as createdOn FROM smsMapFacultyToSubject WHERE institutionId = '${userInputs.institutionId}' and empRefId = '${userInputs.empRefId}'`
      );
      message = {
        message: "Successfully mapped the faculty to subject(s)",
        status: true,
        statuscode: 200,
        data: inserteddata,
      };
    } else {
      message = {
        message: "Failed to map the faculty to subject(s)",
        status: false,
        statuscode: 200,
        data: null,
      };
    }

    res.status(200).json(message);
  } catch (e) {
    next(e);
  }
};

exports.FacultyListToMapWithSubject = async (req, res, next) => {
  try {
    const userQuerys = await validate.CheckInstitutionId.validateAsync(
      req.query
    );
    const institutionId = userQuerys.institutionId;

    let fields = `se.id, se.institutionId, se.employeeId, se.firstName, se.lastName, se.department, '10:00am to 4:00pm' as workingHours, smfts.mappedSubject`;

    const [...AllEmployee] = await database.query(
      `SELECT ${fields} FROM smsEmployee se left join smsMapFacultyToSubject smfts on se.id = smfts.empRefId WHERE  se.isDeleted = '0' and se.institutionId = '${institutionId}' ORDER BY se.createdOn DESC`
    );
    res.status(200).json({
      message: "All faculties to map with subject(s)",
      status: true,
      statuscode: 200,
      data: AllEmployee,
    });
  } catch (e) {
    next(e);
  }
};


function removeExistingSubjectCode(arr, ele) {
  var index = arr.indexOf(ele);
  if (index !== -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function allMappedSubjectCode(mappedSubject) {
  let arr = [];
  if (
    mappedSubject["subHeader"] !== undefined &&
    mappedSubject["subHeader"] !== "undefined"
  ) {
    arr.push(mappedSubject["subHeader"]);
  } else {
    const obj = Object.keys(mappedSubject);
    obj.forEach((key, index) => {
      arr.push(mappedSubject[key]["subHeader"]);
    });
  }
  return arr;
}


exports.SubjectMappedWithFaculty = async (req, res, next) => {
  try {
    const userQuery = await validate.CheckInstitutionId.validateAsync(
      req.query
    );

    let sql = `select se.id, se.employeeId, se.firstName, se.lastName, se.nickName, smfts.mappedSubject 
    from smsEmployee se left join smsMapFacultyToSubject smfts on se.id = smfts.empRefId  
    WHERE se.institutionId = '${userQuery.institutionId}' and se.isDeleted = '0'`;

    const [...empResult] = await database.query(sql);

    // console.info('empResult-',empResult);
    sql = `select scsd.id
    ,scsd.subjectDetails
    ,scsd.classId
    ,scsd.department
    ,scsd.academicYear
    ,scsd.section
    ,scsd.board
    from smsClassSubjectDetails scsd where institutionId = '${userQuery.institutionId}'`;
    // console.log(sql);
    const [...subjectResult] = await database.query(sql);

    // console.info('subjectResult-',subjectResult);
    // let mappedSubject = [];
    let newEmpResult = [];

    empResult.forEach((element) => {
      let mappedSubject = element.mappedSubject;
      if (mappedSubject) {
        console.log("case-1-if");
        if (
          typeof mappedSubject["subName"] !== undefined &&
          typeof mappedSubject["subName"] !== "undefined"
        ) {
          console.log("case-2-if");
          subjectResult.forEach((element2) => {
            var subjectDetails = element2.subjectDetails;
            if (subjectDetails) {
              if (
                typeof subjectDetails["subName"] !== undefined &&
                typeof subjectDetails["subName"] !== "undefined"
              ) {
                console.log("case-3-if");
                if (
                  mappedSubject[key]["subHeader"] == subjectDetails["subHeader"]
                ) {
                  console.log("case-4-if");
                  newEmpResult.push({
                    classDegree: element2.classId["subHeader"],
                    subjectCode: mappedSubject["subHeader"],
                    subjectName: mappedSubject["subName"],
                    academicYear: element2.academicYear["subHeader"],
                    section: element2.section["subHeader"],
                    subjectMapped: removeExistingSubjectCode(allMappedSubjectCode(mappedSubject), mappedSubject["subHeader"]),
                    facultyId: element.employeeId,
                    facAutoId: element.id,
                    facultyName: element.firstName + " " + element.lastName,
                  });
                } else {
                  console.log("case-4-else");
                }
              } else {
                console.log("case-3-else");
                var obj2 = Object.keys(subjectDetails);
                let sub = [];
                obj2.forEach((key2, index2) => {
                  if (
                    mappedSubject["subHeader"] ==
                    subjectDetails[key2]["subHeader"]
                  ) {
                    console.log("case-5-if");
                    newEmpResult.push({
                      classDegree: element2.classId["subHeader"],
                      subjectCode: mappedSubject["subHeader"],
                      subjectName: mappedSubject["subName"],
                      academicYear: element2.academicYear["subHeader"],
                      section: element2.section["subHeader"],
                      subjectMapped: removeExistingSubjectCode(allMappedSubjectCode(mappedSubject), mappedSubject["subHeader"]),
                      facultyId: element.employeeId,
                      facAutoId: element.id,
                      facultyName: element.firstName + " " + element.lastName,
                    });
                  } else {
                    console.log("case-5-else");
                  }
                });
              }
            } else {
              console.log("no data found of subjectDetails");
            }
          });
        } else {
          console.log("case-2-else");
          // if multiple row exists
          const obj = Object.keys(mappedSubject);
          obj.forEach((key, index) => {
            subjectResult.forEach((element3) => {
              var subjectDetails3 = element3.subjectDetails;
              if (subjectDetails3) {
                if (
                  typeof subjectDetails3["subName"] !== undefined &&
                  typeof subjectDetails3["subName"] !== "undefined"
                ) {
                  console.log("case-6-if");
                  newEmpResult.push({
                    classDegree: element3.classId["subHeader"],
                    subjectCode: mappedSubject[key]["subHeader"],
                    subjectName: mappedSubject[key]["subName"],
                    academicYear: element3.academicYear["subHeader"],
                    section: element3.section["subHeader"],
                    subjectMapped: removeExistingSubjectCode(allMappedSubjectCode(mappedSubject), mappedSubject[key]["subHeader"]),
                    facultyId: element.employeeId,
                    facAutoId: element.id,
                    facultyName: element.firstName + " " + element.lastName,
                  });
                } else {
                  console.log("case-6-else");

                  var obj3 = Object.keys(subjectDetails3);
                  obj3.forEach((key3, index3) => {
                    if (
                      mappedSubject[key]["subHeader"] ==
                      subjectDetails3[key3]["subHeader"]
                    ) {
                      console.log("case-7-if");
                      newEmpResult.push({
                        classDegree: element3.classId["subHeader"],
                        subjectCode: mappedSubject[key]["subHeader"],
                        subjectName: mappedSubject[key]["subName"],
                        academicYear: element3.academicYear["subHeader"],
                        section: element3.section["subHeader"],
                        subjectMapped: removeExistingSubjectCode(allMappedSubjectCode(mappedSubject), mappedSubject[key]["subHeader"]),
                        facultyId: element.employeeId,
                        facAutoId: element.id,
                        facultyName: element.firstName + " " + element.lastName,
                      });
                    } else {
                      console.log("case-7-else");
                    }
                  });
                }
              } else {
                console.log("no data found of subjectDetails3");
              }
            });
          });
        }
      } else {
        console.log("case-1-else");
      }
    });

    console.log(newEmpResult);
    res.status(200).json({
      message: "Faculty mapped with subject",
      status: true,
      statuscode: 200,
      data: newEmpResult
      // test:{empResult:empResult,subjectResult:subjectResult}
    });

  } catch (e) {
    next(e);
  }
};

exports.EditSubjectInAlreadyMappedFaculty = async (req, res, next) => {
  try{
    const userParams = await validate.CheckParams.validateAsync(req.params);
    const userInputs = await validate.CheckInstitutionIdWithNewSub.validateAsync(req.body);

    let sql = `select se.id, se.employeeId, se.firstName, se.lastName, se.nickName, smfts.mappedSubject, smfts.id as mappedAutoId 
    from smsEmployee se left join smsMapFacultyToSubject smfts on se.id = smfts.empRefId  
    WHERE se.institutionId = '${userInputs.institutionId}' and (se.isDeleted = '0' OR se.isDeleted IS NULL) and se.id = '${userParams.id}'`;
    // console.log(sql);
    const [empResult] = await database.query(sql);

    let mappedSubject = empResult.mappedSubject;

    let newArr = [];
    let newMappedSubject = DeleteMappedSubject(mappedSubject, userInputs.subToRemoveFromFaculty);

    // adding new subject in existing subject list of mapped faculty
    let subToAddInFaculty = JSON.parse(userInputs.subToAddInFaculty);
    
    // console.log(typeof newMappedSubject);
    // console.log('newMappedSubject-',newMappedSubject);

    if(newMappedSubject['subHeader'] !== undefined && newMappedSubject['subHeader'] !== 'undefined'){
      newArr.push(newMappedSubject);
      newArr.push(subToAddInFaculty);
    } else {
      newArr.push(subToAddInFaculty);
      newMappedSubject.forEach( ob => {
        newArr.push(ob);
      });
    }

    newMappedSubject = JSON.stringify(newArr);

    await database.query(`UPDATE smsMapFacultyToSubject SET mappedSubject = '${newMappedSubject}' WHERE institutionId = '${userInputs.institutionId}' and id = '${empResult.mappedAutoId}';`);

    sql = `select se.id, se.employeeId, se.firstName, se.lastName, se.nickName, smfts.mappedSubject, smfts.id as mappedAutoId 
    from smsEmployee se left join smsMapFacultyToSubject smfts on se.id = smfts.empRefId  
    WHERE se.institutionId = '${userInputs.institutionId}' and (se.isDeleted = '0' OR se.isDeleted IS NULL) and se.id = '${userParams.id}'`;

    // console.log(sql);
    const [newEmpResult] = await database.query(sql);
    
    res.status(200).json({
      message: "Subject removed from faculty",
      status: true,
      statuscode: 200,
      data: newEmpResult
    });
  } catch(e){
    next(e);
  }
}

const DeleteMappedSubject = (dbArr, sub) => {
  for (var i = 0; i < dbArr.length; i++) {
    if (dbArr[i]["subHeader"] === sub) {
      dbArr.splice(i, 1);
    }
  }
  return dbArr;
};


exports.RemoveSubjectFromAlreadyMappedWithFaculty = async (req, res, next) => {
  try{
    console.log(req.body);
    const userParams = await validate.CheckParams.validateAsync(req.params);
    const userInputs = await validate.CheckInstitutionIdWithSub.validateAsync(req.body);

    let sql = `select se.id, se.employeeId, se.firstName, se.lastName, se.nickName, smfts.mappedSubject, smfts.id as mappedAutoId 
    from smsEmployee se left join smsMapFacultyToSubject smfts on se.id = smfts.empRefId  
    WHERE se.institutionId = '${userInputs.institutionId}' and (se.isDeleted = '0' OR se.isDeleted IS NULL) and se.id = '${userParams.id}'`;
    // console.log(sql);
    const [empResult] = await database.query(sql);

    let mappedSubject = empResult.mappedSubject;

    let newMappedSubject = DeleteMappedSubject(mappedSubject, userInputs.subToRemoveFromFaculty);
    console.log(typeof newMappedSubject);
    newMappedSubject = JSON.stringify(newMappedSubject);
    // console.log(newMappedSubject);


    
    await database.query(`UPDATE smsMapFacultyToSubject SET mappedSubject = '${newMappedSubject}' WHERE institutionId = '${userInputs.institutionId}' and id = '${empResult.mappedAutoId}';`);

    sql = `select se.id, se.employeeId, se.firstName, se.lastName, se.nickName, smfts.mappedSubject, smfts.id as mappedAutoId 
    from smsEmployee se left join smsMapFacultyToSubject smfts on se.id = smfts.empRefId  
    WHERE se.institutionId = '${userInputs.institutionId}' and (se.isDeleted = '0' OR se.isDeleted IS NULL) and se.id = '${userParams.id}'`;

    // console.log(sql);
    const [newEmpResult] = await database.query(sql);
    
    res.status(200).json({
      message: "Subject removed from faculty",
      status: true,
      statuscode: 200,
      data: newEmpResult
    });
  } catch(e){
    next(e);
  }
}
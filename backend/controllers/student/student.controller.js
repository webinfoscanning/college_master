const createErrors = require("http-errors");
const database = require("../../db");
const validate = require("../../helpers/joi.student");
// const path = require("path");
// const URL = "http://localhost:5500/";

/********************student data**********************/
exports.AllStudent = async (req, res, next) => {
  try {
    const userQuerys = await validate.CheckInstitutionId.validateAsync(
      req.query
    );
    let sql = `SELECT sp.id, sp.institutionId, sp.firstname, sp.lastname, sp.date, sp.image, sp.castCerfificate,sp.birthCertificate, sp.dob, sp.email, sp.gender,sp.aadhar,sp.aadharUpload,sp.placeOfBirth,sp.bloodGroup,sp.masterHeaderVaue, DATE_FORMAT(sp.createdOn, '%Y-%m-%d %h:%i:%s') as createdOn, DATE_FORMAT(sp.lastEditedOn, '%Y-%m-%d %h:%i:%s') as lastEditedOn,  
    (select ssa.address from smsStuAddress ssa WHERE ssa.stuId=sp.id AND ssa.defaultValue = '1' AND ssa.institutionId='${userQuerys.institutionId}') as address,
    (select ssp.phone from smsStuPhone ssp WHERE ssp.stuId=sp.id AND ssp.defaultValue = '1' AND ssp.institutionId='${userQuerys.institutionId}') as phone,

    sspdf.name as fathername, sspdf.dob as fatherdob,sspdf.mobile as fathermobile,
    
    
    sspdm.name as mothername, sspdm.dob as motherdob,sspdm.mobile as mothermobile
    
    FROM smsStuApplication sp 
    left join smsStdParentDetails sspdf on sspdf.stuId = sp.id and sspdf.institutionId = '${userQuerys.institutionId}' and sspdf.parentType = 'FATHER'
    left join smsStdParentDetails sspdm on sspdm.stuId = sp.id and sspdm.institutionId = '${userQuerys.institutionId}' and sspdm.parentType = 'MOTHER'

    WHERE sp.isDeleted = '0' and sp.institutionId = '${userQuerys.institutionId}' ORDER BY sp.createdOn DESC`;
    // console.log(sql);
    const [...alldata] = await database.query(sql);

    // console.log(alldata);
    res.status(200).json(alldata);
  } catch (e) {
    next(e);
  }
};

exports.StudentById = async (req, res, next) => {
  try {
    const userQuerys = await validate.CheckInstitutionId.validateAsync(
      req.query
    );
    const userParams = await validate.CheckParams.validateAsync(req.params);

    const [...alldata] = await database.query(
      `SELECT sp.id, sp.institutionId, sp.firstname, sp.lastname, sp.date, sp.image, sp.castCerfificate, sp.birthCertificate, sp.dob, sp.email, sp.gender, sp.aadhar,
      sp.aadharUpload,sp.placeOfBirth,sp.bloodGroup, 
      sp.state as statejson, (select shn.name from smsHeaderName shn WHERE shn.id = json_extract(sp.state, '$.rowrefid')) as stateheader ,
      sp.city as cityjson, (select shn.name from smsHeaderName shn WHERE shn.id = json_extract(sp.city, '$.rowrefid')) as cityheader ,
      sp.country as countryjson, (select shn.name from smsHeaderName shn WHERE shn.id = json_extract(sp.country, '$.rowrefid')) as countryValue ,
      sp.religion as religionjson, (select shn.name from smsHeaderName shn WHERE shn.id = json_extract(sp.religion, '$.rowrefid')) as religionValue ,
      DATE_FORMAT(sp.createdOn, '%Y-%m-%d %h:%i:%s') as createdOn, DATE_FORMAT(sp.lastEditedOn, '%Y-%m-%d %h:%i:%s') as lastEditedOn,  
      (select address from smsStuAddress ssa WHERE ssa.stuId=sp.id AND ssa.defaultValue = '1' AND ssa.institutionId='${userQuerys.institutionId}') as address,
      (select phone from smsStuPhone ssp WHERE ssp.stuId=sp.id AND ssp.defaultValue = '1' AND ssp.institutionId='${userQuerys.institutionId}') as phone,

      sspdf.name as fathername, sspdf.dob as fatherdob,sspdf.mobile as fathermobile,
      sspdf.photo as fatherphoto,sspdf.email as fatheremail,sspdf.religion as fatherReligion,sspdf.aadhar as fatherAadhar,
      sspdf.aadharUpload as fatherUploadAadher,sspdf.panCard as fatherPanCard,sspdf.education as fatherEdu,
      sspdf.occupation as fatherOcc,sspdf.address as fatherAdd,sspdf.income as fatherInco,sspdf.city as fatherCity,
      sspdf.state as fatherState, sspdf.country as fatherCountry, 
    
    
      sspdm.name as mothername, sspdm.dob as motherdob,sspdm.mobile as mothermobile,
      sspdm.photo as motherphoto,sspdm.email as motheremail,sspdm.religion as motherReligion,sspdm.aadhar as motherAadhar,
      sspdm.aadharUpload as motherUploadAadher,sspdm.panCard as motherPanCard,sspdm.education as motherEdu,
      sspdm.occupation as motherOcc,sspdm.address as motherAdd,sspdm.income as motherInco,sspdm.city as motherCity,
      sspdm.state as motherState, sspdm.country as motherCountry
      
      
      FROM smsStuApplication sp 
      left join smsStdParentDetails sspdf on sspdf.stuId = sp.id and sspdf.institutionId = '${userQuerys.institutionId}' and sspdf.parentType = 'FATHER'
      left join smsStdParentDetails sspdm on sspdm.stuId = sp.id and sspdf.institutionId = '${userQuerys.institutionId}' and sspdm.parentType = 'MOTHER'

      WHERE sp.isDeleted = '0' and sp.institutionId = '${userQuerys.institutionId}' and sp.id = '${userParams.id}' ORDER BY sp.createdOn DESC`
    );

    let message = {
      message: "Fee structure data",
      status: true,
      data: alldata,
    };

    // console.log(alldata);
    res.status(200).json(message);
  } catch (e) {
    next(e);
  }
};

exports.CreateStudent = async (req, res, next) => {
  try {
    const createdBy = 1; //logged in user
    const userInputs = await validate.AddUpdateStudent.validateAsync(req.body);
    const isDeleted = 0;
    const data = await database.execute(
      `INSERT INTO 
      smsStuApplication(institutionId,firstname,lastname,date,image,castCerfificate,birthCertificate,dob,email,gender,aadhar,aadharUpload,placeOfBirth,bloodGroup,address,religion,state,city,country,classDegree,department,acedemicYear,boardUniversity,isDeleted,createdBy,createdOn) 
    VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        userInputs.institutionId || "",
        userInputs.firstname || "",
        userInputs.lastname || "",
        userInputs.date || "",
        userInputs.image || "",
        userInputs.castCerfificate || "",
        userInputs.birthCertificate || "",
        userInputs.dob || "",
        userInputs.email || "",
        userInputs.gender || "",
        userInputs.aadhar || "",
        userInputs.aadharUpload || "",
        userInputs.placeOfBirth || "",
        userInputs.bloodGroup || "",
        userInputs.address || "",
        userInputs.religion || "",
        userInputs.state || "",
        userInputs.city || "",
        userInputs.country || "",
        userInputs.classDegree || "",
        userInputs.department || "",
        userInputs.acedemicYear || "",
        userInputs.boardUniversity || "",
        isDeleted,
        createdBy,
        new Date(),
      ]
    );

    if (data) {
      const stuId = data["insertId"];
      const defaultValue = 1;
      await database.execute(
        `INSERT INTO 
        smsStuAddress(stuId,institutionId,address,defaultValue,createdBy,createdOn) 
      VALUES(?,?,?,?,?,?)`,
        [
          stuId,
          userInputs.institutionId || "",
          userInputs.address || "",
          defaultValue,
          createdBy,
          new Date(),
        ]
      );

      await database.execute(
        `INSERT INTO 
        smsStuPhone(stuId,institutionId,phone,defaultValue,createdBy,createdOn) 
      VALUES(?,?,?,?,?,?)`,
        [
          stuId,
          userInputs.institutionId || "",
          userInputs.phone || "",
          defaultValue,
          createdBy,
          new Date(),
        ]
      );
    }

    let message;
    if (parseInt(data.insertId) > 0) {
      const [inserteddata] = await database.query(
        `SELECT id, institutionId,firstname,lastname,date,image,castCerfificate,birthCertificate,dob,email,gender,aadhar,aadharUpload,placeOfBirth,bloodGroup,religion,state,city,country,classDegree,department,acedemicYear,boardUniversity, createdBy, DATE_FORMAT(createdOn, '%Y-%m-%d %h:%i:%s') as createdOn FROM smsStuApplication WHERE id = '${parseInt(
          data.insertId
        )}'`
      );
      message = {
        message: "Successfully added the student",
        status: true,
        data: inserteddata,
      };
    } else {
      message = { message: "Failed to add student", status: false };
    }

    res.status(200).json(message);
  } catch (e) {
    next(e);
  }
};

exports.UpdateStudent = async (req, res, next) => {
  // console.log(req.body);
  let error;
  try {
    const userInputs = await validate.AddUpdateStudent.validateAsync(req.body);
    // const userQuerys = await validate.CheckInstitutionId.validateAsync(req.query);
    const userParams = await validate.CheckParams.validateAsync(req.params);
    const editedBy = 1; //logged in user
    // const curdate = new Date();

    let sql = `UPDATE smsStuApplication 
    SET 
    firstname = '${userInputs.firstname}', 
    lastname = '${userInputs.lastname}',
    date = '${userInputs.date}',
    image = '${userInputs.image}',
    castCerfificate = '${userInputs.castCerfificate}',
    birthCertificate = '${userInputs.birthCertificate}',
    dob = '${userInputs.dob}',
    email = '${userInputs.email}',
    gender = '${userInputs.gender}',
    aadhar = '${userInputs.aadhar}',
    aadharUpload = '${userInputs.aadharUpload}',
    placeOfBirth = '${userInputs.placeOfBirth}',
    bloodGroup = '${userInputs.bloodGroup}',
    religion = '${userInputs.religion}',
    state = '${userInputs.state}',
    city = '${userInputs.city}',
    country = '${userInputs.country}', 
    classDegree = '${userInputs.classDegree}',
    department = '${userInputs.department}',
    acedemicYear = '${userInputs.acedemicYear}',
    boardUniversity = '${userInputs.boardUniversity}',
    editedBy = ${editedBy}, 
    lastEditedOn = NOW()  
  WHERE institutionId = '${userInputs.institutionId}' and (isDeleted = '0' OR isDeleted IS NULL) and id = '${userParams.id}';`;

    const data = await database.query(sql);

    if (data.affectedRows) {
      const [updateddata] = await database.query(
        `SELECT id, institutionId,firstname,lastname,date,dob,email,image,castCerfificate,birthCertificate,gender,aadhar,aadharUpload,placeOfBirth,bloodGroup,religion,state,city,country,classDegree,department,acedemicYear,boardUniversity, createdBy, DATE_FORMAT(createdOn, '%Y-%m-%d %h:%i:%s') as createdOn FROM smsStuApplication WHERE id = '${userParams.id}'`
      );
      error = {
        message: "Successfully updated the student",
        status: true,
        data: updateddata,
      };
    } else {
      error = { message: "Failed to update the student", status: false };
    }

    res.status(200).send({ message: error });

    // res.status(200).send({ message: message, data: data });
  } catch (e) {
    next(e);
  }
};

exports.DeleteStudent = async (req, res, next) => {
  let error;
  try {
    const userQuerys = await validate.CheckInstitutionId.validateAsync(
      req.query
    );
    const userParams = await validate.CheckParams.validateAsync(req.params);
    const data = await database.query(
      `UPDATE smsStuApplication SET isDeleted = '1' WHERE institutionId = '${userQuerys.institutionId}' and id = '${userParams.id}';`
    );

    if (data.affectedRows) {
      error = {
        message: "Successfully deleted the student",
        status: true,
      };
    } else {
      error = { message: "Failed to delete the student", status: false };
    }
    res.status(200).send({ message: error });
    // res
    //   .status(200)
    //   .send({ message: "Succesfully deleted the student", data: data });
  } catch (e) {
    next(e);
  }
};

/******parents detail*******/

exports.CreateUpdateStudentPatents = async (req, res, next) => {
  // console.log(req.body);
  try {
    let uploadPath;
    let fileName;

    let message = "";
    const createdBy = 1; //logged in user
    const userInputs = await validate.AddUpdateParents.validateAsync(req.body);

    const [rows] = await database.execute(
      `SELECT id FROM smsStdParentDetails WHERE parentType = '${userInputs.parentType}' and institutionId = '${userInputs.institutionId}' and stuId = '${userInputs.stuId}'`
    );
    // console.log("rows-", rows);
    if (rows === undefined || rows === "undefined") {
      let data = await database.execute(
        `INSERT INTO 
        smsStdParentDetails(stuId,institutionId,name,dob,photo,mobile,email,religion,aadhar,aadharUpload,panCard,education,occupation,address,income,city,state,country,parentType,createdBy,createdOn) 
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          userInputs.stuId || "",
          userInputs.institutionId || "",
          userInputs.name || "",
          userInputs.dob || "",
          userInputs.photo || "",
          req.body.mobile || "",
          req.body.email || "",
          userInputs.religion,
          req.body.aadhar || "",
          userInputs.aadharUpload || "",
          userInputs.panCard || "",
          userInputs.education || "",
          userInputs.occupation || "",
          userInputs.address || "",
          userInputs.income || "",
          userInputs.city || "",
          userInputs.state || "",
          userInputs.country || "",
          userInputs.parentType || "",

          createdBy,
          new Date(),
        ]
      );

      message = {
        message: `Successfully added the student "${userInputs.parentType.toLowerCase()}" details`,
        status: true,
        statuscode: 200,
        data: null,
      };
    } else {
      let editedBy = 1;
      let data = await database.query(
        `UPDATE smsStdParentDetails SET 
        name = '${userInputs.name}', 
        dob = '${userInputs.dob}',
        email = '${userInputs.email}',
        religion = '${userInputs.religion}',
        aadhar = '${userInputs.aadhar}',
        aadharUpload = '${userInputs.aadharUpload}',
        panCard = '${userInputs.panCard}',
        education = '${userInputs.education}',
        occupation = '${userInputs.occupation}',
        address = '${userInputs.address}',
        income = '${userInputs.income}', 
        city = '${userInputs.city}',
        state = '${userInputs.state}',
        country = '${userInputs.country}',
        parentType = '${userInputs.parentType}',
        editedBy = ${editedBy}, lastEditedOn = NOW()  
      WHERE parentType = '${userInputs.parentType}' and institutionId = '${userInputs.institutionId}' and stuId = '${userInputs.stuId}';`
      );

      message = {
        message: "Successfully updated the student parent details",
        status: true,
        statuscode: 200,
        data: null,
      };
    }

    res.status(200).json(message);
  } catch (e) {
    next(e);
  }
};

exports.AddStudentNewPhone = async (req, res, next) => {
  try {
    const createdBy = 1; //logged in user
    const userInputs = await validate.AddUpdateStudentPhone.validateAsync(
      req.body
    );
    let message = "New phone not added";
    const [rows] = await database.execute(
      `SELECT id FROM smsStuApplication WHERE institutionId = '${userInputs.institutionId}' and id = '${userInputs.id}'`
    );

    let phoneInsertId;
    if (rows !== undefined && rows !== "undefined") {
      const data = await database
        .query(
          `INSERT INTO 
          smsStuPhone(stuId,institutionId,phone,defaultValue,createdBy,createdOn) 
        VALUES(?,?,?,?,?,?)`,
          [
            userInputs.id || "",
            userInputs.institutionId || "",
            userInputs.phone || "",
            1,

            createdBy,
            new Date(),
          ]
        )
        .then((result) => {
          phoneInsertId = result["insertId"];

          database.query(
            `UPDATE smsStuPhone SET defaultValue = '0' WHERE institutionId = '${userInputs.institutionId}' and stuId = '${userInputs.id}' and id != '${phoneInsertId}';`
          );
          message = "Successfully added the new student phone";
        });
    } else {
      message = "Student not found";
    }
    res.json({ message: message });
  } catch (e) {
    next(e);
  }
};

exports.UpdateStudentPhone = async (req, res, next) => {
  try {
    const userQuery = await validate.studentPhoneDetailInQuery.validateAsync(
      req.query
    );

    const userParams = await validate.CheckParams.validateAsync(req.params);

    const userInputs = await validate.IdstudentPhone.validateAsync(req.body);

    //let message = "New phone not added";

    let editedBy = 1;
    await database
      .query(
        `UPDATE smsStuPhone SET 
        phone = '${userInputs.phone}', 
        defaultValue = 1, 
        editedBy = ${editedBy}, lastEditedOn = NOW()  
        WHERE stuId = '${userQuery.refid}' and institutionId = '${userQuery.institutionId}' and id = '${userParams.id}';`
      )
      .then((result) => {
        database.query(
          `UPDATE smsStuPhone SET defaultValue = '0' WHERE institutionId = '${userQuery.institutionId}' and stuId = '${userQuery.refid}' and id != '${userParams.id}';`
        );
      });

    res.json({ message: "The phone has been updated" });
  } catch (e) {
    next(e);
  }
};

/******************student search*****************/

// find student by name like first name last name
exports.FindStudentDetails = async (req, res, next) => {
  try {
    const userQuerys = await validate.SearchStudent.validateAsync(req.query);
    //,ssa.city,ssa.country,ssa.religion
    let sql = `select ssa.id,ssa.firstname,ssa.lastname  
    ,(select ssp.phone from smsStuPhone ssp WHERE ssp.stuId=ssa.id AND ssp.institutionId='${userQuerys.institutionId}' and ssp.defaultValue = '1') as phone
    , sspdf.name as fathername , sspdm.name as mothername 
    from smsStuApplication ssa 
    left join smsStdParentDetails sspdf on sspdf.stuId = ssa.id and sspdf.institutionId = '${userQuerys.institutionId}' and sspdf.parentType = 'FATHER'
    left join smsStdParentDetails sspdm on sspdm.stuId = ssa.id and sspdm.institutionId = '${userQuerys.institutionId}' and sspdm.parentType = 'MOTHER'
    WHERE (ssa.isDeleted = '0' OR ssa.isDeleted IS NULL) and ssa.institutionId='${userQuerys.institutionId}' AND 
    (ssa.firstname  LIKE '${userQuerys.searchfield}%' or ssa.lastname  LIKE '${userQuerys.searchfield}%'
    or (select ssp.phone from smsStuPhone ssp WHERE ssp.stuId=ssa.id AND ssp.institutionId='${userQuerys.institutionId}' and ssp.defaultValue = '1') 
    LIKE '${userQuerys.searchfield}%' or sspdf.name  LIKE '${userQuerys.searchfield}%' or sspdm.name  LIKE '${userQuerys.searchfield}%'
    )`;
    // console.log(sql);
    const [...alldata] = await database.query(sql);

    let message = {
      message: "Already mapped student with selected fee structure",
      status: true,
      statuscode: 200,
      data: alldata,
    };
    res.status(200).json(message);
  } catch (e) {
    next(e);
  }
};

/* find all detail of student by ID after search by student name */

exports.GetStudentAllDetailsById = async (req, res, next) => {
  try {
    const userParams = await validate.CheckParams.validateAsync(req.params);

    let sql = `select ssa.id,ssa.firstname,ssa.lastname,ssa.city,ssa.state,ssa.country,ssa.religion
    ,(select ssaffsm.id from smsStuAppliFormFeeStruMapping ssaffsm WHERE ssaffsm.stuAppliFormRefId = ssa.id) as feeMappedId
    ,ssa.dob,ssa.image,ssa.email,ssa.gender,ssa.aadhar,ssa.placeOfBirth,ssa.bloodGroup,ssa.address
    ,ssa.classDegree,ssa.department,ssa.acedemicYear,ssa.boardUniversity  
    ,(select ssp.phone from smsStuPhone ssp WHERE ssp.stuId=ssa.id and ssp.defaultValue = '1') as phone
    , sspdf.name as fathername , sspdm.name as mothername 
    from smsStuApplication ssa 
    left join smsStdParentDetails sspdf on sspdf.stuId = ssa.id and sspdf.parentType = 'FATHER'
    left join smsStdParentDetails sspdm on sspdm.stuId = ssa.id and sspdm.parentType = 'MOTHER'
    WHERE (ssa.isDeleted = '0' OR ssa.isDeleted IS NULL) and ssa.id='${userParams.id}'`;
    // console.log(sql);
    const [...result] = await database.query(sql);

    let message = {
      message: "All details of student",
      status: true,
      statuscode: 200,
      data: result,
    };
    res.status(200).json(message);
  } catch (e) {
    next(e);
  }
};

/*********mapping to student application with fee structure*********/
exports.StuAppliFeeStrucMap = async (req, res, next) => {
  try {
    const createdBy = 1; //logged in user
    const userInputs = await validate.StuAppliFeeStruMap.validateAsync(
      req.body
    );
    const isDeleted = 0;
    let message;
    const [rows] = await database.execute(
      `SELECT count(id) tid FROM smsStuAppliFormFeeStruMapping WHERE institutionId = '${userInputs.institutionId}' and stuAppliFormRefId = '${userInputs.stuAppliFormRefId}' and feeStruRefId = '${userInputs.feeStruRefId}'`
    );
    // console.log(rows);
    if (rows.tid == 0) {
      const data = await database.execute(
        `INSERT INTO 
      smsStuAppliFormFeeStruMapping(institutionId,stuAppliFormRefId,feeStruRefId,stuSection,isDeleted,createdBy,createdOn) 
    VALUES(?,?,?,?,?,?,?)`,
        [
          userInputs.institutionId || "",
          userInputs.stuAppliFormRefId || "",
          userInputs.feeStruRefId || "",
          userInputs.stuSection || "",
          isDeleted,
          createdBy,
          new Date(),
        ]
      );
      if (data.affectedRows == 1) {
        const [result] = await database.execute(
          `SELECT * FROM smsStuAppliFormFeeStruMapping WHERE id = '${parseInt(
            data.insertId
          )}'`
        );
        message = {
          message: "Successfully mapped student with selected fee structure",
          status: true,
          statuscode: 200,
          data: result,
        };
      } else {
        message = {
          message: "Failed to map student with selected fee structure",
          status: false,
          statuscode: 200,
          data: null,
        };
      }
    } else {
      message = {
        message: "Already mapped student with selected fee structure",
        status: true,
        statuscode: 200,
        data: null,
      };
    }
    res.json(message);
  } catch (e) {
    next(e);
  }
};

exports.GetStudentMappedDetailsById = async (req, res, next) => {
  try {
    const userParams = await validate.CheckParams.validateAsync(req.params);

    let sql = `select ssa.id,ssa.firstname,ssa.lastname,ssa.city,ssa.state,ssa.country,ssa.religion
    ,ssa.dob,ssa.image,ssa.email,ssa.gender,ssa.aadhar,ssa.placeOfBirth,ssa.bloodGroup,ssa.address
    ,ssa.classDegree,ssa.department,ssa.acedemicYear,ssa.boardUniversity  
    ,(select ssp.phone from smsStuPhone ssp WHERE ssp.stuId=ssa.id and ssp.defaultValue = '1') as phone
    , sspdf.name as fathername , sspdm.name as mothername, sfs.fee, sfs.feeType, sfs.feeValue 
    from smsStuApplication ssa 
    left join smsStuAppliFormFeeStruMapping ssaffsm on ssaffsm.stuAppliFormRefId = ssa.id
    left join smsFeeStructure sfs on sfs.id = ssaffsm.feeStruRefId
    left join smsStdParentDetails sspdf on sspdf.stuId = ssa.id and sspdf.parentType = 'FATHER'
    left join smsStdParentDetails sspdm on sspdm.stuId = ssa.id and sspdm.parentType = 'MOTHER'
    WHERE (ssa.isDeleted = '0' OR ssa.isDeleted IS NULL) and ssa.id='${userParams.id}'`;
    console.log(sql);
    const [...result] = await database.query(sql);

    let message = {
      message: "Student details of mapped with fee structure",
      status: true,
      statuscode: 200,
      data: result,
    };
    res.status(200).json(message);
  } catch (e) {
    next(e);
  }
};

exports.GetFeeStruListAsPerClaDepAceBordForStudent = async (req, res, next) => {
  try {
    const userParams = await validate.CheckParams.validateAsync(req.params);
    let sql = `select  sfa.id,sfa.fee,sfa.feeType,sfa.feeValue,sfa.description,sfa.classDegree
    ,sfa.department, sfa.academicYear, sfa.boardUniversity
    ,(select headerValue from smsHeaderName where headerPrefix = 'config_section' and institutionId = ssa.institutionId) as sectionjson
    from smsFeeStructure sfa inner join smsStuApplication ssa
    on json_extract(sfa.classDegree, '$.subHeader') = json_extract(ssa.classDegree, '$.subHeader')
    and json_extract(sfa.department, '$.subHeader') = json_extract(ssa.department, '$.subHeader')
    and json_extract(sfa.academicYear, '$.subHeader') = json_extract(ssa.acedemicYear, '$.subHeader')
    and json_extract(sfa.boardUniversity, '$.subHeader') = json_extract(ssa.boardUniversity, '$.subHeader')
    WHERE (sfa.isDeleted = '0' OR sfa.isDeleted IS NULL) and (ssa.isDeleted = '0' OR ssa.isDeleted IS NULL)
    and ssa.id='${userParams.id}'`;
    // console.log(sql);
    const [...stuResult] = await database.query(sql);
    // console.log(stuResult);

    let message = {
      message: "Student details of mapped with fee structure",
      status: true,
      statuscode: 200,
      data: stuResult,
    };
    res.status(200).json(message);
  } catch (e) {
    next(e);
  }
};

exports.GetStudentDetailForFeeCollectionByAdmissionId = async (
  req,
  res,
  next
) => {
  try {
    const userParams = await validate.CheckParams.validateAsync(req.params);
    let sql = `select 
    ssaffsm.id as admid, ssaffsm.stuAppliFormRefId,ssa.firstname,ssa.lastname,ssa.city,ssa.state,ssa.country,ssa.religion
    ,ssa.dob,ssa.image,ssa.email,ssa.gender,ssa.aadhar,ssa.placeOfBirth,ssa.bloodGroup,ssa.address
    ,ssa.classDegree,ssa.department,ssa.acedemicYear,ssa.boardUniversity
    ,sfc.paymentDetails  
    ,(select ssp.phone from smsStuPhone ssp WHERE ssp.stuId=ssa.id and ssp.defaultValue = '1') as phone
    , sspdf.name as fathername , sspdm.name as mothername, sfs.fee, sfs.feeType, sfs.feeValue 
       
    from smsStuAppliFormFeeStruMapping ssaffsm
    left join smsStuApplication ssa on ssaffsm.stuAppliFormRefId = ssa.id
    left join smsFeeStructure sfs on sfs.id = ssaffsm.feeStruRefId
    left join smsFeeCollection sfc on ssaffsm.id = sfc.idFeeStruMapWithStu
    left join smsStdParentDetails sspdf on sspdf.stuId = ssa.id and sspdf.parentType = 'FATHER'
    left join smsStdParentDetails sspdm on sspdm.stuId = ssa.id and sspdm.parentType = 'MOTHER'
    WHERE (ssa.isDeleted = '0' OR ssa.isDeleted IS NULL) and ssaffsm.id='${userParams.id}'`;
    // console.log(sql);
    const [...stuResult] = await database.query(sql);
    // console.log(stuResult);

    let message = {
      message: "Student details by admission id",
      status: true,
      statuscode: 200,
      data: stuResult,
    };
    res.status(200).json(message);
  } catch (e) {
    next(e);
  }
};

function checkTotalPayment(paymentDetails) {
  let paidAmt = 0;
  // console.log(paymentDetails);
  if(paymentDetails['subAmount'] !== undefined && paymentDetails['subAmount'] !== 'undefined'){
    paidAmt = paymentDetails['subAmount'];
  } else {
    var obj = Object.keys(paymentDetails);
    obj.forEach((key, index) => {
      paidAmt = paidAmt + parseInt(paymentDetails[key]['subAmount']);
    });
  }
  return paidAmt;
}

exports.CollectFeeOfStudent = async (req, res, next) => {
  try {
    const createdBy = 1; //logged in user
    const userInputs = await validate.AddUpdateFeeCollection.validateAsync(
      req.body
    );
    const isDeleted = 0;
    // idFeeStruMapWithStu -> id of smsStuAppliFormFeeStruMapping tbl

    // sample of paymentDetails
    // let paymentDetails = {
    //   "userId":"2",
    //   "subAmount":"10000",
    //   "subDescrition": "Book",
    //   "createdDate":"2022-06-27T04:38:47.308Z"
    // }


    let sql = `SELECT ssaffsm.id as idFeeStruMapWithStu,sfs.fee,json_extract(ssaffsm.stuSection, '$.subHeader') as section  
    FROM smsStuAppliFormFeeStruMapping ssaffsm 
    left join smsFeeStructure sfs on sfs.id = ssaffsm.feeStruRefId
    WHERE (sfs.isDeleted = '0' OR sfs.isDeleted IS NULL)
    and ssaffsm.id = '${userInputs.idFeeStruMapWithStu}'`;
    // console.log(sql);
    const [getfeedet] = await database.execute(sql);
      // console.log(getfeedet);
    
    if (getfeedet !== undefined && getfeedet !== "undefined") {
      
      let paymentDetails = JSON.parse(userInputs.paymentDetails);
      let paidAmt = checkTotalPayment(paymentDetails);
      console.log('paidAmt--',paidAmt,',getfeedet.fee-',getfeedet.fee);
      if (paidAmt > getfeedet.fee) {
        throw createErrors.Conflict(
          `Can't collect fee more than "${getfeedet.fee}"!`
        );
      }
    } else {
      throw createErrors.Conflict(
        `This student is not mapped with any fee structure!`
      );
    }

    sql = `SELECT sfc.id,sfc.paymentDetails 
    FROM smsFeeCollection sfc 
    WHERE (sfc.isDeleted = '0' OR sfc.isDeleted IS NULL)
    and sfc.idFeeStruMapWithStu = '${userInputs.idFeeStruMapWithStu}'`;
    // console.log(sql);
    const [feecoll] = await database.execute(sql);
    // console.log(feecoll);
    if (feecoll === undefined || feecoll === "undefined") {
      sql = `select 
      count(ssa.id) as lastrollno 
      from smsFeeStructure sfs 
      left join smsStuAppliFormFeeStruMapping ssaffsm on sfs.id = ssaffsm.feeStruRefId
      left join smsStuApplication ssa on ssa.id = ssaffsm.stuAppliFormRefId  
      where json_extract(sfs.classDegree, '$.subHeader') = json_extract(ssa.classDegree, '$.subHeader')
      and json_extract(sfs.department, '$.subHeader') = json_extract(ssa.department, '$.subHeader')
      and json_extract(sfs.academicYear, '$.subHeader') = json_extract(ssa.acedemicYear, '$.subHeader')
      and json_extract(sfs.boardUniversity, '$.subHeader') = json_extract(ssa.boardUniversity, '$.subHeader') 
      and json_extract(ssaffsm.stuSection, '$.subHeader') = '${getfeedet.section}'`;
      // console.log(sql);
      const [toCol] = await database.execute(sql);
      // console.log(toCol);

      let lastrollno = parseInt(toCol.lastrollno);
      if(isNaN(lastrollno)) {
        lastrollno = 0;
      }

      const rollNo = lastrollno + 1;

      await database.execute(
        `INSERT INTO 
        smsFeeCollection(idFeeStruMapWithStu,stuId,rollNo,institutionId,paymentDetails,isDeleted,createdBy,createdOn) 
      VALUES(?,?,?,?,?,?,?,?)`,
        [
          userInputs.idFeeStruMapWithStu || "",
          userInputs.stuId || "",
          rollNo, // it will create dynamically after mapping student with section
          userInputs.institutionId || "",
          userInputs.paymentDetails || "",
          isDeleted,
          createdBy,
          new Date(),
        ]
      );
    } else {
      // update here
      let editedBy = 1;
      await database.query(
        `UPDATE smsFeeCollection SET 
        paymentDetails = '${userInputs.paymentDetails}', 
        editedBy = ${editedBy}, lastEditedOn = NOW()  
      WHERE isDeleted = '0' and institutionId = '${userInputs.institutionId}' and id = '${feecoll.id}';`
      );
    }


    const [feecollection] = await database.query(
      `SELECT id,idFeeStruMapWithStu,stuId,rollNo,institutionId,paymentDetails, createdBy, DATE_FORMAT(createdOn, '%Y-%m-%d %h:%i:%s') as createdOn 
        FROM smsFeeCollection WHERE isDeleted = '0' and institutionId = '${userInputs.institutionId}' and idFeeStruMapWithStu = '${userInputs.idFeeStruMapWithStu}'`
    );
    let message = {
      message: "Successfully fee collected of student",
      status: true,
      statuscode: 200,
      data: feecollection,
    };

    res.status(200).json(message);
  } catch (e) {
    next(e);
  }
};

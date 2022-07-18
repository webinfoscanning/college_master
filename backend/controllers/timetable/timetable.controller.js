const createErrors = require("http-errors");
const { object } = require("joi");
const database = require("../../db");
const validate = require("../../helpers/joi.timetable");

/********************timetable date**********************/

exports.AllTimetable = async (req, res, next) => {
  try {
    const userQuerys = await validate.CheckInstitutionId.validateAsync(
      req.query
    );
    const institutionId = userQuerys.institutionId;

    let fields = `id, institutionId, classDegree, department, section, acadimicYear, DATE_FORMAT(createdOn, '%Y-%m-%d %h:%i:%s') as createdOn, DATE_FORMAT(lastEditedOn, '%Y-%m-%d %h:%i:%s') as lastEditedOn`;

    const [...AllTimetable] = await database.query(
      `SELECT ${fields} FROM smsTimetable WHERE  isDeleted = '0' and institutionId = '${institutionId}' ORDER BY createdOn DESC`
    );
    res.status(200).json({
      message: "All timetable data",
      status: true,
      statuscode: 200,
      data: AllTimetable,
    });
  } catch (e) {
    next(e);
  }
};

exports.getTimetableById = async (req, res, next) => {
  try {
    const userQuery = await validate.CheckInstitutionId.validateAsync(
      req.query
    );
    const userParams = await validate.CheckParams.validateAsync(req.params);
    const institutionId = userQuery.institutionId;
    const id = userParams.id;

    const [...Timetable] = await database.query(
      `SELECT * FROM smsTimetable WHERE  isDeleted = '0' and institutionId = '${institutionId}' and id = '${id}' ORDER BY createdOn DESC`
    );
    res.status(200).json({
      message: "Timetable details",
      status: true,
      statuscode: 200,
      data: Timetable,
    });
  } catch (e) {
    next(e);
  }
};

exports.CreateTimetable = async (req, res, next) => {
  try {
    const createdBy = 1; //logged in user
    const isDeleted = 0;
    const userInputs = await validate.AddUpdateTimetable.validateAsync(
      req.body
    );

    const result = await database.execute(
      `INSERT INTO 
      smsTimetable(institutionId,classDegree,department,section,acadimicYear,subject,description,event,location,notes
        ,colorcode,duration,reminder,eventSet,isDeleted,createdBy,createdOn) 
    VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        userInputs.institutionId || "",
        userInputs.classDegree || "",
        userInputs.department || "",
        userInputs.section || "",
        userInputs.acadimicYear || "",
        userInputs.subject || "",
        userInputs.description || "",
        userInputs.event || "",
        userInputs.location || "",
        userInputs.notes || "",
        userInputs.colorcode || "",
        userInputs.duration || "",
        userInputs.reminder || "",
        userInputs.eventSet || "",
        isDeleted,
        createdBy,
        new Date(),
      ]
    );

    let message;
    if (result.affectedRows === 1) {
      const [inserteddata] = await database.query(
        `SELECT * FROM smsTimetable WHERE id = '${parseInt(result.insertId)}'`
      );
      message = {
        message: "Successfully added the timetable",
        status: true,
        statuscode: 200,
        data: inserteddata,
      };
    } else {
      message = {
        message: "Failed to added the timetable",
        status: false,
        statuscode: 200,
        data: null,
      };
    }

    res.json(message);
  } catch (e) {
    next(e);
  }
};

exports.UpdateTimetable = async (req, res, next) => {
  try {
    const userInputs = await validate.AddUpdateTimetable.validateAsync(
      req.body
    );
    const editedBy = 1; //logged in user

    const result = await database.query(
      `UPDATE smsTimetable SET 
      classDegree = '${userInputs.classDegree}',department = '${userInputs.department}',section = '${userInputs.section}',
      acadimicYear = '${userInputs.acadimicYear}',subject = '${userInputs.subject}',description = '${userInputs.description}',
      event = '${userInputs.event}',location = '${userInputs.location}',notes = '${userInputs.notes}',
      colorcode = '${userInputs.colorcode}',duration = '${userInputs.duration}',reminder = '${userInputs.reminder}',
      eventSet = '${userInputs.eventSet}', editedBy = ${editedBy}, lastEditedOn = NOW()  
      WHERE institutionId = '${userInputs.institutionId}' and id = '${req.params.id}';`
    );
    let message;
    if (result.affectedRows === 1) {
      const [updateddata] = await database.query(
        `SELECT * FROM smsTimetable WHERE institutionId = '${userInputs.institutionId}' and id = '${req.params.id}'`
      );
      message = {
        message: "Successfully update the timetable",
        status: true,
        statuscode: 200,
        data: updateddata,
      };
    } else {
      message = {
        message: "Failed to update the timetable",
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

exports.DeleteTimetable = async (req, res, next) => {
  const userQuerys = await validate.CheckInstitutionId.validateAsync(req.query);
  const institutionId = userQuerys.institutionId;
  try {
    const result = await database.query(
      `UPDATE smsTimetable SET isDeleted = '1' WHERE institutionId = '${institutionId}' and id = '${req.params.id}';`
    );
    let message;
    if (result.affectedRows === 1) {
      message = {
        message: "Succesfully deleted the timetable",
        status: true,
        statuscode: 200,
        data: null,
      };
    } else {
      message = {
        message: "Failed to delete the timetable",
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

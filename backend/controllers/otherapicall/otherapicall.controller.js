const createErrors = require("http-errors");
const { object } = require("joi");
const database = require("../../db");
const validate = require("../../helpers/joi.otherapicall");
const fetch = require('node-fetch');


exports.getAreaDetailsByPinCode = async (req, res, next) => {
  try {
    const userParams = await validate.PostalCode.validateAsync(req.params);

    let areadetails;

    await fetch("https://api.postalpincode.in/pincode/" + userParams.pincode, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(json => {
        areadetails = json;
        // console.log(json)
      });
    


    res.status(200).json({
      message: "Area details",
      status: true,
      statuscode: 200,
      data: areadetails[0].PostOffice,
    });
  } catch (e) {
    next(e);
  }
};


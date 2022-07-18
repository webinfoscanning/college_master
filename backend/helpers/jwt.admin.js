const jwt = require("jsonwebtoken");
const AT = process.env.JWT_ADMIN_AT;
const RT = process.env.JWT_ADMIN_RT;
const createErrors = require("http-errors");
//database for valid client check
const database = require("../db");

exports.createToken = async (userID) => {
  return new Promise((resolve, reject) => {
    const payload = { userID };
    const options = {
      issuer: "WiSM",
      expiresIn: "1y",
    };
    jwt.sign(payload, AT, options, (error, token) => {
      if (error) reject(createErrors.InternalServerError());
      resolve(token);
    });
  });
};

exports.createRefreshToken = async (userID) => {
  return new Promise((resolve, reject) => {
    const payload = { userID };
    const options = {
      issuer: "WiSM",
      expiresIn: "1y",
    };
    jwt.sign(payload, RT, options, (error, token) => {
      if (error) reject(createErrors.InternalServerError());
      resolve(token);
    });
  });
};

//check jwt middleware
exports.verifyJWT = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      throw createErrors.Unauthorized("Unauthorized access!");
    }
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, AT, (error, payload) => {
      if (error) {
        //return res.json(error);
        if (error.name === "JsonWebTokenError") {
          throw createErrors.Unauthorized();
        } else if (error.name === "TokenExpiredError") {
          throw createErrors.Unauthorized("Expired");
        } else {
          throw createErrors.Unauthorized();
        }
      }
      req.payload = payload;
      next();
    });
  } catch (e) {
    next(e);
  }
};

exports.verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, RT, (error, payload) => {
      if (error) {
        if (error.name === "JsonWebTokenError") {
          reject(createErrors.Unauthorized());
        } else {
          reject(createErrors.Unauthorized(error.message));
        }
      }
      //check this token already available in the database
      const userID = payload.userID;
      resolve(userID);
    });
  });
};

exports.VerifyAdmin = async (req, res, next) => {
  try {
    if (!req.headers["authorization"])
      throw createErrors.Unauthorized("Unauthorized access!");
    const token = req.headers["authorization"].split(" ")[1];
    console.log(token === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsImlhdCI6MTY1MDYzNzc0NCwiZXhwIjoxNjgyMTk1MzQ0LCJpc3MiOiJXaVNNIn0.kTg_BHz1aDOdOjtVwOog2-uFemurSgmznwxvDUKIk_0')
    const [dataFound] = await database.execute(
      "SELECT id, activated FROM admin WHERE token = ?",
      [token]
    );
    console.log(dataFound)
    if (dataFound.length <= 0) {
      throw createErrors.Unauthorized();
    }
    if (!dataFound[0].activated) {
      throw createErrors.Unauthorized("Account not active");
    }
    next();
  } catch (e) {
    next(e);
  }
};

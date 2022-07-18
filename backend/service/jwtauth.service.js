const jwt = require("jsonwebtoken");
// const config = require("../../database/config/config.json")["jwtConfig"];

const config = {
  jwtConfig: {
    secretekey: "sms_secret_key",
  },
};
const sessionStorage = require("sessionstorage");

const expiringTime = new Date().getTime() + 60 * 24 * 60 * 60 * 1000;
const generatejwt = async (email, id) => {
  const token = await jwt.sign({ email: email, id: id }, config.jwtConfig.secretekey, {
    expiresIn: expiringTime,
  });
  return token;
};

const verifyauth = async (req, res, next) => {
  const jwtToken = req.headers["authorization"];
  const authToken = jwtToken ? jwtToken.slice(7, jwtToken.length) : null;
  const path = req.path;
  try {
    if (path.includes("users") || path.includes("assessments")) {
      next();
    } else {
      if (jwtToken.startsWith("Bearer ")) {
        await jwt.verify(authToken, config.secretekey, (err, payload) => {
          if (err) {
            return res
              .status(401)
              .send({ message: "Invalid / Expired Access Token" });
          } else {
            const sessionUser = sessionStorage.getItem(`user-${payload.id}`);
            const sessionEmp = sessionStorage.getItem(`employee-${payload.id}`);
            if (sessionUser === authToken || sessionEmp === authToken) {
              req.payload = payload;
              next();
            } else {
              if (sessionUser == null && sessionEmp == null) {
                return res.status(400).send({ message: "session close" });
              } else {
                return res
                  .status(401)
                  .send({ message: "another login detect" });
              }
            }
          }
        });
      } else {
        res.status(400).send({ message: "Inavalid Access Token" });
      }
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "internal server error/auth token required" });
  }
};

module.exports = { generatejwt, verifyauth, expiringTime };

const {
  passwordHash,
  comparePassword,
  genRandomString,
} = require("../../service/passwordhashing.service");
const { generatejwt, expiringTime } = require("../../service/jwtauth.service");
// const User = require('../../database/model/user.model');
const database = require("../../db");
const createErrors = require("http-errors");
const path = require("path");
const nodemailer = require("nodemailer");

const ssologin = async (model, req, res) => {
  // try {
  //     console.log('the sso login app started')
  //     passport.authenticate('azuread-openidconnect',
  //         {
  //             response: res,
  //             prompt: 'login',
  //             failureRedirect: '/login',
  //             failureFlash: true,
  //         }
  //     )(model, req, res);
  // } catch (error) {
  //     console.log(error)
  // }
};

const login_new = async (req, res, next) => {
  //   let message;
  try {
    const email = req.body.email;
    const password = req.body.password;

    const sql = `SELECT * FROM smsUsers WHERE email = '${email}'`;
    const [user] = await database.query(sql);

    if (user) {
      var isPasswordCorrect = await comparePassword(
        password,
        user.passwordHash
      );

      if (isPasswordCorrect) {
        // console.log("isPasswordCorrect--- ", isPasswordCorrect);
        const token = await generatejwt(email, user.id);
        if (token) {
          var userObj = JSON.parse(JSON.stringify(user));
          delete userObj.password;
          res.status(200).send({
            user: userObj,
            token: token,
            responseStatus: 1,
            expiringTime: expiringTime,
          });
        } else {
          res.status(400).send({
            message: "Unable to generate secret key, try after sometime",
            responseStatus: 0,
          });
        }
      } else {
        res.status(404).send({
          message: "Invalid Password",
          responseStatus: 0,
          isPasswordCorrect: `${isPasswordCorrect}`,
        });
      }
    } else {
      res.status(404).send({ message: "invalid email", responseStatus: 0 });
    }
  } catch (e) {
    next(e);
  }
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    // const user = await model.findAll({
    //   where: {
    //     email: email,
    //   },
    // });
    const sql = `SELECT * FROM smsUsers WHERE email = '${email}'`;
    // console.log(sql);
    const [user] = await database.query(sql);

    // console.log(user);
    if (user) {
      var isPasswordCorrect = await comparePassword(
        password,
        user.passwordHash
      );

      if (isPasswordCorrect) {
        // console.log("isPasswordCorrect--- ", isPasswordCorrect);
        const token = await generatejwt(email, user.id);
        // const token = 'ajxwwqexgwh7216bzgsjahgdjahs91827^*IYGJHGjhgdhfgehjgfahghsdds';
        // console.log(typeof token);
        // console.log(token);
        if (token) {
          var userObj = JSON.parse(JSON.stringify(user));
          delete userObj.password;
          res.status(200).send({
            user: userObj,
            token: token,
            responseStatus: 1,
            expiringTime: expiringTime,
          });
        } else {
          res.status(400).send({
            message: "Unable to generate secret key, try after sometime",
            responseStatus: 0,
          });
        }
      } else {
        res.status(404).send({
          message: "Invalid Password",
          responseStatus: 0,
          isPasswordCorrect: `${isPasswordCorrect}`,
        });
      }
    } else {
      res.status(404).send({ message: "invalid email", responseStatus: 0 });
    }
  } catch (error) {
    res.status(500).send({ message: error, responseStatus: 0 });
  }
};

const create = async (req, res) => {
  // console.log(req.body);
  try {
    const { password, ...rest } = req.body;
    if (password.length >= 8) {
      const userObj = JSON.parse(JSON.stringify(rest));
      console.log(userObj);
      const hashObj = await passwordHash(password);
      userObj.passwordHash = `${hashObj.passwordHash}.${hashObj.salt}`;
      // const institutionId = "test123456";
      const institutionId = rest.institutionId;
      const createdBy = 1;
      const userRole = 2;
      const data = await database.execute(
        `INSERT INTO 
        smsUsers(institutionId,userRole,name,email,passwordHash,createdBy,createdOn) 
      VALUES(?,?,?,?,?,?,?)`,
        [
          institutionId,
          userRole,
          userObj.name || "",
          userObj.email || "",
          userObj.passwordHash,
          createdBy,
          new Date(),
        ]
      );

      res.status(200).send({
        success: true,
        message: "User Created Successfully",
        responseStatus: 1,
      });
    } else {
      res.status(500).send({
        message: "password length should be the more than 8 characters",
      });
    }
  } catch (error) {
    res.status(500).send({ message: error["text"] });
  }
};

const list = async (req, res) => {
  // console.log(req.query.institutionId);
  try {
    let sql = `SELECT su.institutionId,su.userRole,su.name,su.email,su.createdBy,su.createdOn
    FROM smsUsers su
    WHERE su.isDeleted = '0' and su.institutionId = '${req.query.institutionId}' ORDER BY su.createdOn DESC`;
    // console.log(sql);
    const [...allUsers] = await database.query(sql);

    // console.log(allUsers);
    let message = {
      message: "All users list",
      status: true,
      statuscode: 200,
      data: allUsers,
    };
    res.status(200).json(message);
  } catch (error) {
    res.status(500).send({ message: error["text"] });
  }
};


const updateUser = async (req, res) => {
  const id = req.params.id;
  const editedBy = 1;
  try {
    let sql = `SELECT count(id) as tid FROM smsUsers WHERE id = '${id}' and institutionId = '${req.body.institutionId}'`;
    const [user] = await database.query(sql);
    if (parseInt(user.tid) === 1) {
      //email = '${req.body.email}', note - email is used for login so it can be update or not after discussion will decide
      sql = `UPDATE smsUsers 
        SET 
        name = '${req.body.name}', 
        address = '${req.body.address}',
        photo = '${req.body.photo}',
        editedBy = ${editedBy}, 
        lastEditedOn = NOW()  
        WHERE institutionId = '${req.body.institutionId}' and (isDeleted = '0' OR isDeleted IS NULL) and id = '${id}';`;
        const data = await database.query(sql);
      if (data.affectedRows) {
        res
          .status(200)
          .send({ message: "Updated Succesfully", responseStatus: 1 });
      } else {
        res
          .status(404)
          .send({ message: "Failed to update the user", responseStatus: 0 });
      }
    } else {
      res.status(404).send({ message: "Unable to update", responseStatus: 0 });
    }
  } catch (error) {
    res.status(500).send({ message: error, responseStatus: 0 });
  }
};

// const updateUser = async (model, req, res) => {
//   const id = req.body.id;

//   try {
//     const user = await model.findAll({
//       where: {
//         id: id,
//       },
//     });
//     if (user) {
//       const updateuser = { ...req.body };
//       const updates = await model.update(updateuser, {
//         where: {
//           id: id,
//         },
//       });
//       res
//         .status(200)
//         .send({ message: "Updated Succesfully", responseStatus: 1 });
//     } else {
//       res.status(404).send({ message: "Unable to delete", responseStatus: 0 });
//     }
//   } catch (error) {
//     res.status(500).send({ message: error, responseStatus: 0 });
//   }
// };

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    let sql = `SELECT id FROM smsUsers WHERE isDeleted = '0' and id = '${id}' and institutionId = '${req.query.institutionId}'`;
    const [user] = await database.query(sql);
    if (user) {
      res
        .status(200)
        .send({ message: "Deleted Succesfully", responseStatus: 1 });
    } else {
      res.status(404).send({ message: "Unable to delete", responseStatus: 0 });
    }
  } catch (error) {
    res.status(500).send({ message: error, responseStatus: 0 });
  }
};

// const deleteUser = async (model, req, res) => {
//   const id = req.body.id;

//   try {
//     const user = await model.destroy({
//       where: {
//         id: id,
//       },
//     });
//     if (user) {
//       res
//         .status(200)
//         .send({ message: "Deleted Succesfully", responseStatus: 1 });
//     } else {
//       res.status(404).send({ message: "Unable to delete", responseStatus: 0 });
//     }
//   } catch (error) {
//     res.status(500).send({ message: error, responseStatus: 0 });
//   }
// };


// reset password steps by sending a email link
/* send reset password link in email */
// const sendEmailLink = async (req, res) => {
//   var email = req.body.email;
//   try {
//     const user = await User.findAll({
//       where: {
//         email: req.body.email,
//       },
//     });
//     const token = await generatejwt(email, user[0].dataValues.id);
//     var sent = sendEmail(email, token);

//     if (sent !== "0") {
//       var data = {
//         token: token,
//       };
//     } else {
//       type = "error";
//       msg = "Something goes to wrong. Please try again";
//     }
//   } catch (error) {
//     res.status(404).send({ error: "User doesn't exists" });
//   }
// };

const sendEmailLink = async (req, res) => {
  const urlhost = req.protocol + "://" + req.get("host");
  var email = req.body.email;
  try {
    let sql = `SELECT id,institutionId,userRole,name,email FROM smsUsers WHERE email = '${email}'`;
    const [user] = await database.query(sql);
    
    // const user = await User.findAll({
    //   where: {
    //     email: req.body.email,
    //   },
    // });
    const token = await generatejwt(email, user.id);
    var sent = sendEmail(email, token, urlhost);

    if (sent !== "0") {
      var data = {
        token: token,
      };
    } else {
      type = "error";
      msg = "Something goes to wrong. Please try again";
    }
  } catch (error) {
    res.status(404).send({ error: "User doesn't exists" });
  }
};


function sendEmail(email, token, urlhost) {
  var email = email;
  var token = token;
  var urlhost = urlhost;

  const mail = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: "SSLv3",
    },
    // auth: {
    //   user: "rozerbagh4722@hotmail.com",
    //   pass: "19Vicky93",
    // },
    auth: {
      user: "sushil@zerozilla.com",
      pass: "q5SraBzCQzE3FQZ",
    },
    logger: true,
  });

  var html = `<table>
        <tbody>
            <tr>
                <td>
                    <p>You requested for reset password, kindly use this <a href="${urlhost}/api/user/reset-password?token=${token}">Reset Token${token}</a> to reset your password</p>
                </td>
            </tr>
        </tbody>
    </table>`;
    console.log(html);
  var mailOptions = {
    // from: "rozerbagh4722@hotmail.com",
    from: "sushil@zerozilla.com",
    to: email,
    subject: "Reset Password Link",
    html: html,
  };

  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(404).send({ error: "User doesn't exists" });
      console.log(1);
    } else {
      console.log(0);
    }
  });
}

// function sendEmail(email, token) {
//   var email = email;
//   var token = token;

//   const mail = nodemailer.createTransport({
//     host: "smtp-mail.outlook.com",
//     secureConnection: false, // TLS requires secureConnection to be false
//     port: 587, // port for secure SMTP
//     tls: {
//       ciphers: "SSLv3",
//     },
//     auth: {
//       user: "rozerbagh4722@hotmail.com",
//       pass: "19Vicky93",
//     },
//     logger: true,
//   });

//   var html = `<table>
//         <tbody>
//             <tr>
//                 <td>
//                     <p>You requested for reset password, kindly use this <a href="http://localhost:4000/reset-password?token=${token}">Reset Token${token}</a> to reset your password</p>
//                 </td>
//             </tr>
//         </tbody>
//     </table>`;
//   var mailOptions = {
//     from: "rozerbagh4722@hotmail.com",
//     to: email,
//     subject: "Reset Password Link",
//     html: html,
//   };

//   mail.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(1);
//     } else {
//       console.log(0);
//     }
//   });
// }
const changePassword = async (req, res) => {
  try {
    const email = req.body.email;
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const user = await User.findAll({
      where: {
        email: email,
      },
    });
    if (oldPassword != newPassword) {
      if (user) {
        var isPasswordCorrect = await comparePassword(
          password,
          user[0].dataValues.password
        );
        if (isPasswordCorrect) {
          if (newPassword == confirmNewPassword) {
            const hashObj = await passwordHash(newPassword);
            const hash = `${hashObj.passwordHash}.${hashObj.salt}`;
            const updatepass = { password: hash };
            await User.update(updatepass, {
              where: {
                id: user[0].dataValues.id,
              },
            });
            res.status(200).send({
              response: {
                success: true,
                responseStatus: 1,
                message: "Password Updated successfully",
              },
            });
          } else {
            res.status(404).send({
              response: {
                message: "New Password and Confirm New Password must match",
                responseStatus: 0,
              },
            });
          }
        } else {
          res.status(404).send({
            response: { message: "invalid Old Pasword", responseStatus: 0 },
          });
        }
        res
          .status(200)
          .send({ message: "Password has been reset", responseStatus: 1 });
      } else {
        res
          .status(404)
          .send({ message: "Unable to delete", responseStatus: 0 });
      }
    } else {
    }
  } catch (error) {
    res.status(500).send({ message: error, responseStatus: 0 });
  }
};

module.exports = {
  login,
  create,
  list,
  deleteUser,
  updateUser,
  changePassword,
  sendEmailLink,
  ssologin,
};

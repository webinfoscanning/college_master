// const twilio = require('twilio');
// const accountSid = 'AC9ded0683e5c7a80b9115f253396bb744'; // Your Account SID from www.twilio.com/console
// const authToken = 'e79af816e995735c118ea99ab1b568fb'; // Your Auth Token from www.twilio.com/console

// const client = new twilio(accountSid, authToken);
// module.exports.sendSMS = async (otp) => {
//     const message = await client.messages.create({
//         body: `Your one time password (OTP) - ${otp}`,
//         to: '+918050849022', // Text this number
//         from: '+7787995794', // From a valid Twilio number
//     })
//     return message;
// }
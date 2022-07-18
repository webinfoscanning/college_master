var crypto = require("crypto");
const saltRounds = 10;

var sha512 = async (password, salt)=>{
	try {
		var hash = await crypto.createHmac("sha512", salt); /** Hashing algorithm sha512 */
		await hash.update(password);
		var value = await hash.digest("hex");
		return {
			salt: salt,
			passwordHash: value
		};
	} catch (error) {
		console.log(error); 
	}
};

var genRandomString = async (length)=>{
	try {
		return await crypto
		.randomBytes(Math.ceil(length / 2))
		.toString("hex") /** convert to hexadecimal format */
		.slice(0, length); /** return required number of characters */
	} catch (error) {
		console.log(error);
	}
};

let HashPassword = async (userpassword)=>{
	try {
		var salt = await genRandomString(16); /** Gives us salt of length 16 */
		var passwordData = await sha512(userpassword, salt);
		return passwordData;
	} catch (error) {
		console.log(error);
	}
}

let saltHashPassword = async (userpassword, salt)=>{
	try {
		var passwordData = await sha512(userpassword, salt);
		return passwordData;
	} catch (error) {
		console.log(error);
	}
}

let passwordHash = async (password) => {
	return await HashPassword(password);
};
let comparePassword = async (password, passwordHash) => {
	try {
		let ph = await saltHashPassword(password, passwordHash.split(".")[1]);
		
		return ph.passwordHash == passwordHash.split(".")[0];
	} catch (error) {
		console.log(error);
	}
};

module.exports = { passwordHash, comparePassword, genRandomString };
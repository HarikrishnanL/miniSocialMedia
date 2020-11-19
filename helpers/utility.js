let regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let regMobileNumber = /^\d{10}$/;
const bcrypt = require('bcrypt');
const saltRounds = 13;

class UtilJs{
	isNumeric(num){
		return !isNaN(num);
	};

	validateField(data){
		return !(!data || data == "" || data == null || data == undefined);
	};

	validateLoginEmailField(value) {
		return  regEmail.test(value);
	};

	validateLoginMobileField(value){
		return  regMobileNumber.test(value);
	};

	async encryptPassword(password){
		return await bcrypt.hash(password, saltRounds);
	};

	async comparePassword(password,encryptedPassword){
		return await bcrypt.compare(password, encryptedPassword);
	};

	async generateRandomSixDigitNumber(){
		return await Math.floor(100000 + Math.random() * 900000);
	};

	validateRequestFlag(data){
		return data === 'ACCEPT' || data === 'REJECT';
	}

}


module.exports = new UtilJs();



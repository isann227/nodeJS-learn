const validator = require('validator');

const isValidPhone = (phone) => validator.isMobilePhone(phone, 'id-ID');
const isValidEmail = (email) => validator.isEmail(email);

module.exports = { isValidPhone, isValidEmail };

import validator from 'validator';

export const isValidPhone = (phone) => {
  return validator.isMobilePhone(phone, 'id-ID');
};

export const isValidEmail = (email) => {
  return validator.isEmail(email);
};

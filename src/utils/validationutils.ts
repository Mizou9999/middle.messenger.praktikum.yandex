export const validateLogin = (login: string): boolean => {
  const loginRegex = /^[a-zA-Z0-9_-]{3,20}$/;
  return loginRegex.test(login) && /[a-zA-Z]/.test(login);
};
export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
  return passwordRegex.test(password);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};
export const validateName = (name: string): boolean => {
  const nameRegex = /^[A-ZА-Я][a-zа-я-]+(-[A-ZА-Я][a-zа-я-]+)*$/;
  return nameRegex.test(name);
};
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?\d{10,15}$/;
  return phoneRegex.test(phone);
};
export const doesPasswordMatch = (password: string, repeatPassword: string): boolean => {
  return password === repeatPassword;
};

export const validatePassword = (txt: string): boolean => {
  const regex = /^[a-zA-Z0-9]{8,24}$/;
  return regex.test(String(txt));
};

export const validateEmail = (email: string): boolean => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

//Full name TH EN
export const ThaiEngTextReg = (txt: string): boolean => {
  const regex = /^[A-Za-z\s]+$|^[ก-๏\s]+$/;
  return regex.test(String(txt));
};

export const EngNumReg = (txt: string): boolean => {
  const regex = /^[A-Za-z0-9]+$/;
  return regex.test(String(txt));
};

export const NumReg = (txt: string): boolean => {
  const regex = /^[0-9]+$/;
  return regex.test(String(txt));
};

export const PasswordReg = (txt: string): boolean => {
  const regex = /^[a-zA-Z0-9]{8,24}$/;
  return regex.test(String(txt));
};

export const EmailReg = (email: string): boolean => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

export const EngNumReg = (txt: string): boolean => {
  const regex = /^[A-Za-z0-9]+$/;
  return regex.test(String(txt));
};

export const NumReg = (txt: string): boolean => {
  const regex = /^[0-9]+$/;
  return regex.test(String(txt));
};

export const LaserIDReg = (txt: string): boolean => {
  const regex = /^[a-zA-z]{2}[0-9]{10}$/;
  return regex.test(String(txt));
};

export const PhoneNoReg = (txt: string): boolean => {
  const regex = /[0-9]{10}|[66][0-9]{9}/;
  return regex.test(String(txt));
};

export const NameReg = (txt: string): boolean => {
  const regex = /^[A-Za-z\s]{1,50}$|^[ก-๏\s]{1,50}$/;
  return regex.test(String(txt));
};

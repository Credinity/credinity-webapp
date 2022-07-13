export function phoneNumberFormat(value: string) {
  // if input value is falsy eg if the user deletes the input, then just return
  if (!value) return value;

  // clean the input for any non-digit values.
  const phoneNumber = value.replace(/[^\d]/g, "");

  // phoneNumberLength is used to know when to apply our formatting for the phone number
  const phoneNumberLength = phoneNumber.length;

  // we need to return the value with no formatting if its less then four digits
  // this is to avoid weird behavior that occurs if you  format the area code to early

  if (phoneNumberLength < 4) return phoneNumber;

  // if phoneNumberLength is greater than 4 and less the 7 we start to return
  // the formatted number
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }

  // finally, if the phoneNumberLength is greater then seven, we add the last
  // bit of formatting and return it.
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6, 10)}`;
}

let cidOldValue = "";
export function citizenFormat(value: string) {
  if (!value) return value;
  const cid = value.replace(/[^\d]{0,12}/g, "");
  const cidLength = cid.length;
  const oldLength = cidOldValue.length;
  if (cidOldValue.length > cidLength) {
    cidOldValue = cid;
    return value;
  } else if (cidOldValue.length == cidLength) {
  } else {
    if (cidLength < 2) {
      cidOldValue = cid;
      return `${cid.slice(0, 1)}-${cid.slice(1, 5)}`;
    } else if (cidLength < 6) {
      cidOldValue = cid;
      return `${cid.slice(0, 1)}-${cid.slice(1, 5)}`;
    } else if (cidLength < 10) {
      cidOldValue = cid;
      return `${cid.slice(0, 1)}-${cid.slice(1, 5)}-${cid.slice(5, 10)}`;
    } else if (cidLength < 12) {
      cidOldValue = cid;
      return `${cid.slice(0, 1)}-${cid.slice(1, 5)}-${cid.slice(
        5,
        10
      )}-${cid.slice(10, 12)}`;
    } else if (cidLength < 14) {
      cidOldValue = cid;
      return `${cid.slice(0, 1)}-${cid.slice(1, 5)}-${cid.slice(
        5,
        10
      )}-${cid.slice(10, 12)}-${cid.slice(12, 13)}`;
    } else {
      return `${cid.slice(0, 1)}-${cid.slice(1, 5)}-${cid.slice(
        5,
        10
      )}-${cid.slice(10, 12)}-${cid.slice(12, 13)}`;
    }
  }
}

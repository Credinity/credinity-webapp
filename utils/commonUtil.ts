import { Error } from "@/models/base.model";

export const productImageURL = (image?: string): string => {
  return `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL_API}/${image}`;
};

export const userProfileImageURL = (image?: string): string => {
  return `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL_API}/${image}`;
};

export const isClient = () => typeof window !== "undefined";

export const isServer = () => typeof window === "undefined";

export const getWindow = () => isClient() && window;

export const getBase64 = (file: any): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const b64toBlob = async (img: string): Promise<Blob> => {
  const base64Response = await fetch(img);
  const blob = await base64Response.blob();
  return blob;
};

export const mapErrorListToStringArr = (
  errorList: Error[]
): (string | undefined)[] => {
  let res = errorList.map((i) => {
    return i.message;
  });
  return res;
};

export const calculateAge = (dob: any): Number => {
  var diff_ms = Date.now() - Date.parse(dob);
  var age_dt = new Date(diff_ms);
  let age = Math.abs(age_dt.getUTCFullYear() - 1970);
  return age;
};

export const validNationalID = (id: string): boolean => {
  if (id.length != 13) return false;
  let sum;
  let i;
  // STEP 1 - get only first 12 digits
  for (i = 0, sum = 0; i < 12; i++) {
    // STEP 2 - multiply each digit with each index (reverse)
    // STEP 3 - sum multiply value together
    sum += parseInt(id.charAt(i)) * (13 - i);
  }
  // STEP 4 - mod sum with 11
  let mod = sum % 11;
  // STEP 5 - subtract 11 with mod, then mod 10 to get unit
  let check = (11 - mod) % 10;
  // STEP 6 - if check is match the digit 13th is correct
  if (check == parseInt(id.charAt(12))) {
    return true;
  }
  return false;
};

import { BaseApiRequest, BaseApiResponse } from "./base.model";

export interface SignUpReq extends BaseApiRequest {
  email: string;
  password: string;
  privacyPolicyVersion: string;
}

export interface SignUpRes extends BaseApiResponse {
  token?: string;
  user?: User;
}

export interface User {
  userId: string;
  firstName?: null;
}

export interface UserProfileReq extends BaseApiRequest {
  userId: string;
}

export interface UserProfileRes extends BaseApiResponse {
  userId: string;
  username: "";
  emailVerificationStatus: number;
  fullName: "";
  firstName: "";
  lastName: "";
  kycStatus: number;
}

//======== Form ========//
export interface SignUpFormProps {
  email: string;
  password: string;
  confirmPass: string;
  phoneNo: string;
  confirmOtp: string;
  isAgreeCond: boolean;
  privacyPolicyVersion: string;
}

export interface EkycFormProps {
  displayName: string;
  fullName: string;
  idType?: number;
  idNo: string;
  laserId: string;
  docAddress: string;
  birthDate?: number;
  phoneNumber: string;
  ethnicitySt: string;
  ethnicity?: number;
  nationalitySt: string;
  nationality?: number;
  lineId: string;
  facebook: string;
  referralCode: string;
}

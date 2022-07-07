import { BaseApiRequest, BaseApiResponse } from "@/models/base.model";

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
  username: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  kycStatus: number;
  emailVerificationStatus: number;
}

export interface UserProfileReq {
  userId: string;
}

export interface UserProfileRes extends BaseApiResponse {
  user: User;
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
  username: string;
  fullName: string;
  idType?: number;
  idNo: string;
  laserId: string;
  birthDate?: number;
  phoneNumber: string;
  ethnicitySt: string;
  ethnicity?: number;
  nationalitySt: string;
  nationality?: number;
  lineId: string;
  facebook: string;
  address: string;
  referralCode: string;
}

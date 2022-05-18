import { BaseApiResponse } from "./base.model";

export interface SignUpReq {
  requestId: string;
  email: string;
  password: string;
}

export interface SignUpRes extends BaseApiResponse {
  token: string;
}

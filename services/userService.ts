import { AxiosError } from "axios";
import { v4 as uuidv4 } from "uuid";
import { ApiCaller } from "@/services/apiCaller";
import Cookies from "universal-cookie";
import {
  EkycFormProps,
  SignUpReq,
  SignUpRes,
  UserProfileReq,
  UserProfileRes,
} from "@/models/user.model";
import { HTTP_METHOD_POST } from "@/models/constants/service.constant";
import { Authorization } from "@/models/constants/key.constant";
import { BaseApiResponse } from "@/models/base.model";
import NextApiPromiseBase from "@/services/commonService";

const cookies = new Cookies();

const ValidateResetPasswordKey = async (key: string) => {
  var result = await ApiCaller({
    method: "POST",
    url: "/auth/validateResetPasswordKey",
    req: { key },
  })
    .then((apiResponse: any) => {
      return apiResponse;
    })
    .catch((err: AxiosError) => {
      return {
        isSuccess: false,
        errors: [{ code: err.status, message: err.message }],
      };
    });
  return result;
};

export { ValidateResetPasswordKey };

//ข้อมูลที่ส่งเข้ามาคือ signProps
//: Promise คือ return Promise<type ที่ Back end จะ return อะไรมาบ้าง>

export const signUp = (req: SignUpReq): Promise<SignUpRes> => {
  return NextApiPromiseBase({
    method: HTTP_METHOD_POST,
    url: "/auth/signup",
    req: req,
  });
};

export const getProfile = (req: UserProfileReq): Promise<UserProfileRes> => {
  return NextApiPromiseBase({
    method: HTTP_METHOD_POST,
    url: "/user/getProfile",
    req: req,
    token: cookies.get(Authorization),
  });
};

export const submitKycInformation = (
  req: EkycFormProps
): Promise<BaseApiResponse> => {
  return NextApiPromiseBase({
    method: HTTP_METHOD_POST,
    url: "/user/SubmitKycInformation",
    req: req,
    token: cookies.get(Authorization),
  });
};

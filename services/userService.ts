import { AxiosError } from "axios";
import { v4 as uuidv4 } from "uuid";
import axiosLocal from "@/utils/axiosLocalUtil";
import { ApiCaller } from "@/services/apiCaller";
import { NextApiCaller } from "@/services/nextApiCaller";
import Cookies from "universal-cookie";
import {
  SignUpReq,
  SignUpRes,
  UserProfileReq,
  UserProfileRes,
} from "@/models/user.model";
import { HTTP_METHOD_POST } from "@/models/constants/service.constant";
import { Authorization } from "@/models/constants/key.constant";

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
export const signUp = async (req: SignUpReq): Promise<SignUpRes> => {
  req.requestId = uuidv4();
  const { data: response } = await axiosLocal.post<SignUpRes>(
    "/auth/signup",
    req
  );
  return response;
};

export const getProfile = (req: UserProfileReq): Promise<UserProfileRes> => {
  return new Promise((resolve, reject) => {
    NextApiCaller({
      method: HTTP_METHOD_POST,
      url: "/user/getProfile",
      token: cookies.get(Authorization),
      req: req,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

import { AxiosError } from "axios";
import { ApiCaller } from "./apiCaller";
import {
  SignUpReq,
  SignUpRes,
  UserProfileReq,
  UserProfileRes,
} from "@/models/user.model";
import axiosLocal from "@/utils/axiosLocalUtil";
import { v4 as uuidv4 } from "uuid";

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

export const getProfile = async (
  req: UserProfileReq
): Promise<UserProfileRes> => {
  req.requestId = uuidv4();
  const { data: response } = await axiosLocal.post<UserProfileRes>(
    "/user/getProfile",
    req
  );
  return response;
};

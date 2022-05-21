import { SignUpReq, SignUpRes } from "@/models/auth.model";
import pageApi from "@/utils/axiosLocalUtil";
import { v4 as uuidv4 } from "uuid";
import witreLog from "@/utils/logUtils";

//ข้อมูลที่ส่งเข้ามาคือ signProps
//: Promise คือ return Promise<type ที่ Back end จะ return อะไรมาบ้าง>
export const signUp = async (req: SignUpReq): Promise<SignUpRes> => {
  req.requestId = uuidv4();
  witreLog(`signUp: ${JSON.stringify(req)}`);
  const { data: response } = await pageApi.post<SignUpRes>(
    "/auth/register",
    req
  );
  witreLog(JSON.stringify(response));
  return response;
};

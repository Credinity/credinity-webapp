import { SignUp } from "@/models/auth.model";
import httpsClient from "@/utils/httpsClient";

type signProps = {
  username: string;
  password: string;
};

//ข้อมูลที่ส่งเข้ามาคือ signProps
//: Promise คือ return Promise<type ที่ Back end จะ return อะไรมาบ้าง>
export const signUp = async (user: signProps): Promise<SignUp> => {
  const { data: response } = await httpsClient.post<SignUp>(
    "authen/register",
    user
  );
  return response;
};

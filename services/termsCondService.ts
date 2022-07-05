import { PrivacyPolicyRes } from "@/models/conterm.model";
import axiosLocal from "@/utils/axiosLocalUtil";

export const getPrivacyPolicy = async (): Promise<PrivacyPolicyRes> => {
  const { data: response } = await axiosLocal.get<PrivacyPolicyRes>(
    "/terms/getPrivacyPolicy"
  );
  return response;
};

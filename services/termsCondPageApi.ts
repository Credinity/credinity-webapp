import { PrivacyPolicyRes } from "@/models/conterm.model";
import pageApi from "@/utils/axiosLocalUtil";

export const getPrivacyPolicy = async (): Promise<PrivacyPolicyRes> => {
  const { data: response } = await pageApi.get<PrivacyPolicyRes>(
    "/termsApi/getPrivacyPolicy"
  );
  return response;
};

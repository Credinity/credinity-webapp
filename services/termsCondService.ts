import { HTTP_METHOD_GET } from "@/models/constants/service.constant";
import { PrivacyPolicyRes } from "@/models/conterm.model";
import NextApiPromiseBase from "@/services/commonService";

export const getPrivacyPolicy = (): Promise<PrivacyPolicyRes> => {
  return NextApiPromiseBase({
    method: HTTP_METHOD_GET,
    url: "/terms/getPrivacyPolicy",
  });
};

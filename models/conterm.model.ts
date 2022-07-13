import { BaseApiResponse } from "@/models/base.model";

export interface PrivacyPolicyRes extends BaseApiResponse {
  version: string;
  description: string;
  privacyPolicyTextTh: string;
  privacyPolicyTextEn: string;
  effectiveDate: Date;
}

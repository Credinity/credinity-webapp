import { List } from "reselect/es/types";

interface error {
  code: string;
  target: string;
  massage: string;
}

export interface BaseApiResponse {
  requestId: string;
  isSuccess: string;
  errors: List<error>;
}

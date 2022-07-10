import { v4 as uuidv4 } from "uuid";
import Axios, { AxiosRequestConfig } from "axios";
import { CredLogger } from "@/utils/logUtils";

type Props = {
  method: string;
  url: string;
  req?: any;
  token?: string;
  customeHeader?: Record<string, string>;
  isAddReqId?: boolean;
};

const ApiCaller = async ({
  method,
  url,
  req,
  token,
  customeHeader,
  isAddReqId,
}: Props): Promise<any> => {
  var logger = new CredLogger("API_CALLER");
  try {
    if (
      method == null ||
      method == undefined ||
      method == "" ||
      method.length == 0
    ) {
      logger.error(`calling ${url}: method is ${method}`);
      throw new Error("Method is not defined");
    }

    let headers: Record<string, string> =
      customeHeader != undefined
        ? customeHeader
        : {
            "Content-Type": "application/json",
          };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    if (isAddReqId != undefined && isAddReqId == false) {
      //No need to add requestId
    } else {
      req.requestId = uuidv4();
    }

    let config: AxiosRequestConfig<any> = {
      method: method,
      headers: headers,
      url: process.env.NEXT_PUBLIC_BASE_URL_API + url,
      data: req,
      timeout: 30000,
    };

    logger.info(`[REQUEST] ${url}:`, JSON.stringify(req));
    var response = await Axios.request(config);
    if (response.status == 200) {
      logger.info(`[RESPONSE] ${url}:`, JSON.stringify(response.data));
      return response.data;
    }

    if (response.status == 401) {
      logger.error(`calling ${url}: response status is ${response.status}`);
      logger.info(`[RESPONSE] ${url}:`, JSON.stringify(response.data));
      throw new Error("Unauthorized");
    }

    logger.error(`calling ${url}: response status is ${response.status}`);
    logger.info(`[RESPONSE] ${url}:`, JSON.stringify(response.data));
    throw new Error(response.data.message);
  } catch (error) {
    logger.error(`[ERROR] ${url}:`, JSON.stringify(error));
    throw error;
  }
};

export { ApiCaller };

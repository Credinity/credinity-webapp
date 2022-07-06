import { ApiCaller } from "@/services/apiCaller";
import { HTTP_METHOD_GET } from "@/models/constants/service.constant";
import { apiHandler } from "helpers/api/apiHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

const termsRouter = (req: NextApiRequest, res: NextApiResponse) => {
  const action = req.query["termsActions"][0];

  if (req.method === HTTP_METHOD_GET && action === "getPrivacyPolicy") {
    return getPrivacyPolicy(res);
  } else {
    return res.status(405).end(`Error: Action is not supported for ${req.url}`);
  }
};

async function getPrivacyPolicy(res: NextApiResponse<any>) {
  var apiRequest = {
    requestId: uuidv4(),
  };
  try {
    const response = await ApiCaller({
      method: HTTP_METHOD_GET,
      url: "/Terms/GetLatestPrivacyPolicy",
      req: apiRequest,
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default apiHandler(termsRouter);

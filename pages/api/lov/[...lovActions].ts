import { ApiCaller } from "@/services/apiCaller";
import { HTTP_METHOD_GET } from "@/models/constants/service.constant";
import { apiHandler } from "helpers/api/apiHandler";
import type { NextApiRequest, NextApiResponse } from "next";

const lovRouter = (req: NextApiRequest, res: NextApiResponse) => {
  const action = req.query["lovActions"][0];

  if (req.method === HTTP_METHOD_GET && action === "getLovByType") {
    let lastIndex = req.query["lovActions"].length - 1;
    let lastAction = req.query["lovActions"][lastIndex];
    return getLovByType(lastAction, res);
  } else {
    return res.status(405).end(`Error: Action is not supported for ${req.url}`);
  }
};

async function getLovByType(reqUrl: string, res: NextApiResponse<any>) {
  try {
    const response = await ApiCaller({
      method: HTTP_METHOD_GET,
      url: `/Lov/GetLov/${reqUrl}`,
      isAddReqId: false,
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default apiHandler(lovRouter);

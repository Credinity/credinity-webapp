import { ApiCaller } from "@/services/apiCaller";
import {
  HTTP_METHOD_GET,
  HTTP_METHOD_POST,
} from "@/models/constants/service.constant";
import { apiHandler } from "helpers/api/apiHandler";
import type { NextApiRequest, NextApiResponse } from "next";

const userRouter = (req: NextApiRequest, res: NextApiResponse) => {
  const action = req.query["userActions"][0];

  if (req.method === HTTP_METHOD_POST && action === "getProfile") {
    return getProfile(req, res);
  } else if (req.method === HTTP_METHOD_POST && action === "submitKycForm") {
    return submitKycForm(req, res);
  } else {
    return res.status(405).end(`Error: Action is not supported for ${req.url}`);
  }
};

const getProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let token = req.headers.authorization?.replace("Bearer ", "");
    const response = await ApiCaller({
      method: HTTP_METHOD_POST,
      url: "/User/GetProfile",
      token: token,
      req: req.body,
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const submitKycForm = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let token = req.headers.authorization?.replace("Bearer ", "");
    const response = await ApiCaller({
      method: HTTP_METHOD_POST,
      url: "/User/SubmitKycInformation",
      token: token,
      req: req.body,
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export default apiHandler(userRouter);

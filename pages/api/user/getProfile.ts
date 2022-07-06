import type { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "helpers/api/apiHandler";
import { ApiCaller } from "@/services/apiCaller";
import { HTTP_METHOD_POST } from "@/models/constants/service.constant";
import Cookies from "universal-cookie";
import { Authorization } from "@/models/constants/key.constant";

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

export default apiHandler(getProfile);

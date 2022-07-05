import type { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "helpers/api/apiHandler";
import { ApiCaller } from "@/services/apiCaller";
import { HTTP_METHOD_POST } from "@/utils/constant";
import Cookies from "universal-cookie";
import { Authorization } from "@/public/constants/key.constant";

const getProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cookies = new Cookies();
    const response = await ApiCaller({
      method: HTTP_METHOD_POST,
      url: "/User/GetProfile",
      token: cookies.get(Authorization),
      req: req.body,
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export default apiHandler(getProfile);

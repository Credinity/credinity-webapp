import type { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "helpers/api/apiHandler";
import { ApiCaller } from "@/services/apiCaller";
import { HTTP_METHOD_POST } from "@/utils/constant";

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await ApiCaller({
      method: HTTP_METHOD_POST,
      url: "/Auth/Register",
      req: req.body,
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export default apiHandler(signup);

import type { NextApiRequest, NextApiResponse } from "next";
import axiosHttps from "@/utils/axiosUtil";
import { apiHandler } from "helpers/api/apiHandler";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   const action = req.query["nextAuth"][0];
//   if (req.method === HTTP_METHOD_POST && action === "signup") {
//     return signup(req, res);
//   } else {
//     return res.status(405).end(`Error: Action is not supported for ${req.url}`);
//   }
// }

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axiosHttps.post(`/Auth/Register`, req.body);
    res.json(response.data);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export default apiHandler(signup);

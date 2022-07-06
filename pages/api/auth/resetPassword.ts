import Axios from "axios";
import { apiHandler } from "helpers/api/apiHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export default apiHandler(resetPassword);

async function resetPassword(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).end(`Method ${req.method} Not Allowed`);

  const { key, newPassword } = await req.body;
  try {
    var apiRequest = {
      requestId: uuidv4(),
      key,
      newPassword,
    };

    console.log("[REQUEST] resetPassword", apiRequest);
    Axios.post(
      process.env.NEXT_PUBLIC_BASE_URL_API + "/auth/resetPassword",
      apiRequest
    )
      .then((apiResponse: any) => {
        let { data } = apiResponse;
        console.log("[RESPONSE] resetPassword", data);
        res.json(data);
      })
      .catch((err: any) => {
        console.log("[RESPONSE] resetPassword", err);
        console.log(err);
        res.status(500).json(err);
      });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

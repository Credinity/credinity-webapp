import Axios from "axios";
import { apiHandler } from "helpers/api/apiHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export default apiHandler(getProfileRoute);

async function getProfileRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).end(`Method ${req.method} Not Allowed`);

  const { email, password } = await req.body;
  try {
    var apiRequest = {
      requestId: uuidv4(),
      email: email,
      password: password,
    };
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + req.headers.authorization,
    };
    Axios.post(
      process.env.NEXT_PUBLIC_BASE_URL_API + "/Auth/Login",
      apiRequest,
      {
        headers,
      }
    )
      .then((apiResponse: any) => {
        let { data } = apiResponse;
        res.json(data);
      })
      .catch((err: any) => {
        res.status(500).json(err);
      });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

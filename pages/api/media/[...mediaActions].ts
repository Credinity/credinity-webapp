import { ApiCaller } from "@/services/apiCaller";
import { HTTP_METHOD_POST } from "@/utils/constant";
import { apiHandler } from "helpers/api/apiHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

const mediaRouter = (req: NextApiRequest, res: NextApiResponse) => {
  const action = req.query["mediaActions"][0];
  if (
    req.method === HTTP_METHOD_POST &&
    action === "uploadKycIdentificationImage"
  ) {
    return uploadKycIdentificationImage(req, res);
  } else {
    return res.status(405).end(`Error: Action is not supported for ${req.url}`);
  }
};

async function uploadKycIdentificationImage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("Hello");
    const response = await ApiCaller({
      method: HTTP_METHOD_POST,
      url: "/User/UploadKycIdentificationImage",
      req: req,
      isUploadFile: true,
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default apiHandler(mediaRouter);

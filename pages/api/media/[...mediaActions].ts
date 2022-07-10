import { HTTP_METHOD_POST } from "@/models/constants/service.constant";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import apiHandlerFormData from "helpers/api/apiHandlerFormData";

const mediaRouter = (req: NextApiRequest, res: NextApiResponse) => {
  const action = req.query["mediaActions"][0];
  if (req.method === HTTP_METHOD_POST && action === "uploadKycIdImg") {
    return uploadKycIdImg(req, res);
  } else {
    return res.status(405).end(`Error: Action is not supported for ${req.url}`);
  }
};

async function uploadKycIdImg(req: NextApiRequest, res: NextApiResponse) {
  try {
    let token = req.headers.authorization!;
    const url =
      process.env.NEXT_PUBLIC_BASE_URL_API +
      "/User/UploadKycIdentificationImage";
    axios
      .post(url, req.body, {
        headers: {
          "content-Type": req.headers["content-type"]!,
          Authorization: token,
        },
      })
      .then((resApi) => {
        res.json(resApi.data);
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default apiHandlerFormData(mediaRouter);

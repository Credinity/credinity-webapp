import { HTTP_METHOD_POST } from "@/models/constants/service.constant";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import apiHandlerFormData from "helpers/api/apiHandlerFormData";
import { ApiCaller } from "@/services/apiCaller";

const mediaRouter = (req: NextApiRequest, res: NextApiResponse) => {
  const action = req.query["mediaActions"][0];
  if (
    req.method === HTTP_METHOD_POST &&
    (action === "uploadKycIdImg" || action === "uploadPortraitImg")
  ) {
    return uploadBase64File(action, req, res);
  } else {
    return res.status(405).end(`Error: Action is not supported for ${req.url}`);
  }
};

const uploadBase64File = async (
  action: string,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    let endpoint = MapEndpointApi(action);
    let token = req.headers.authorization?.replace("Bearer ", "");
    const url = `/User/${endpoint}`;

    const response = await ApiCaller({
      method: HTTP_METHOD_POST,
      url: url,
      token: token,
      req: req.body,
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

function MapEndpointApi(reqLocal: string): string {
  if (reqLocal == "uploadKycIdImg") return "UploadKycIdentificationImage";
  else if (reqLocal == "uploadPortraitImg") return "UploadKycPortraitImage";
  else return "";
}

export default apiHandlerFormData(mediaRouter);

import { Authorization } from "@/models/constants/key.constant";
import { HTTP_METHOD_POST } from "@/models/constants/service.constant";
import { MediaRes } from "@/models/content.model";
import Cookies from "universal-cookie";
import NextApiPromiseBase from "./commonService";

const cookies = new Cookies();

export const uploadKycIdentificationImage = (
  req: FormData
): Promise<MediaRes> => {
  return NextApiPromiseBase({
    method: HTTP_METHOD_POST,
    url: "/media/uploadKycIdentificationImage",
    req: req,
    token: cookies.get(Authorization),
  });
};

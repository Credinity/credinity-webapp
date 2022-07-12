import { Authorization } from "@/models/constants/key.constant";
import { HTTP_METHOD_POST } from "@/models/constants/service.constant";
import { FileReq, FileRes } from "@/models/content.model";
import axios from "axios";
import Cookies from "universal-cookie";
import NextApiPromiseBase from "./commonService";

const cookies = new Cookies();

export const uploadImgFormData = (
  req: FileReq,
  path: string
): Promise<FileRes> => {
  return NextApiPromiseBase({
    method: HTTP_METHOD_POST,
    url: path,
    req: req,
    token: cookies.get(Authorization),
  });
};

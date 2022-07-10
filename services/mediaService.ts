import { Authorization } from "@/models/constants/key.constant";
import { MediaRes } from "@/models/content.model";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const uploadKycIdImg = (req: FormData): Promise<MediaRes> => {
  return new Promise((resolve, reject) => {
    let url =
      process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API + "/media/uploadKycIdImg";
    axios
      .post(url, req, {
        headers: {
          "content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookies.get(Authorization)}`,
        },
      })
      .then((res) => {
        const { data } = res;
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

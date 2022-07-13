import { Authorization } from "@/models/constants/key.constant";
import { HTTP_METHOD_GET } from "@/models/constants/service.constant";
import { LovByTypeRes } from "@/models/content.model";
import { NextApiCaller } from "@/services/nextApiCaller";
import Cookies from "universal-cookie";

type Props = {
  method: string;
  url: string;
  req?: any;
  token?: string;
  customeHeader?: Record<string, string>;
};

const cookies = new Cookies();

export default function NextApiPromiseBase<Type>(props: Props): Promise<Type> {
  return new Promise((resolve, reject) => {
    NextApiCaller({
      method: props.method,
      url: props.url,
      req: props.req,
      token: props.token,
      customeHeader: props.customeHeader,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export const GetLovByType = (req: string): Promise<LovByTypeRes> => {
  return NextApiPromiseBase({
    method: HTTP_METHOD_GET,
    url: `/lov/getLovByType/${req}`,
    token: cookies.get(Authorization),
  });
};

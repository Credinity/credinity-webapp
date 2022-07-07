import { NextApiCaller } from "@/services/nextApiCaller";

type Props = {
  method: string;
  url: string;
  req?: any;
  token?: string;
};

export default function NextApiPromiseBase<Type>(props: Props): Promise<Type> {
  return new Promise((resolve, reject) => {
    NextApiCaller({
      method: props.method,
      url: props.url,
      req: props.req,
      token: props.token,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

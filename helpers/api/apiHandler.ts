import { jwtMiddleware } from "./jwtMiddleware";
import { errorHandler } from "./errorHandler";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export { apiHandler };

function apiHandler(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // global middleware
      await jwtMiddleware(req, res);

      // route handler
      await handler(req, res);
    } catch (err: any) {
      // global error handler
      errorHandler(err, res);
    }
  };
}

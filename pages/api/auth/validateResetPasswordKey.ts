import { ApiCaller } from "@/services/apiCaller";
import Axios from "axios";
import { apiHandler } from "helpers/api/apiHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export default apiHandler(validateResetPasswordKey);

async function validateResetPasswordKey(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST")
        return res.status(405).end(`Method ${req.method} Not Allowed`);

    const { key } = await req.body;
    try {
        var apiRequest = {
            requestId: uuidv4(),
            key,
        };

        ApiCaller({
            method: "POST",
            url: "/auth/validateResetPasswordKey",
            req: apiRequest,
        })
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

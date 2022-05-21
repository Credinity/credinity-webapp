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

        console.log("[REQUEST] validateResetPasswordKey", apiRequest);
        Axios.post(
            process.env.BASE_SERVICE_API + "/auth/validateResetPasswordKey",
            apiRequest
        )
            .then((apiResponse: any) => {
                let { data } = apiResponse;
                console.log("[RESPONSE] validateResetPasswordKey", data);
                res.json(data);
            })
            .catch((err: any) => {
                console.log("[RESPONSE] validateResetPasswordKey", err);
                console.log(err);
                res.status(500).json(err);
            });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

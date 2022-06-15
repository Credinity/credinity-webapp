import { ApiCaller } from "@/services/apiCaller";
import Axios from "axios";
import { apiHandler } from "helpers/api/apiHandler";
import { NextApiRequest, NextApiResponse } from "next";

export default apiHandler(sendResetPasswordEmail);

async function sendResetPasswordEmail(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST")
        return res.status(405).end(`Method ${req.method} Not Allowed`);

    const { email } = await req.body;
    try {
        ApiCaller({
            method: "POST",
            url: "/auth/sendResetPasswordEmail",
            req: { email },
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

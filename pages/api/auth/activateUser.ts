import { ApiCaller } from "@/services/apiCaller";
import Axios from "axios";
import { apiHandler } from "helpers/api/apiHandler";
import { NextApiRequest, NextApiResponse } from "next";

export default apiHandler(activateUser);

async function activateUser(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST")
        return res.status(405).end(`Method ${req.method} Not Allowed`);

    const { verificationKey } = await req.body;
    try {
        ApiCaller({
            method: "POST",
            url: "/auth/ActivateUser",
            req: { activationKey: verificationKey },
        })
            .then((response: any) => {
                res.json(response);
            })
            .catch((err: any) => {
                res.status(500).json(err);
            });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

import Axios from "axios";
import { apiHandler } from "helpers/api/apiHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export default apiHandler(loginRoute);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST")
        return res.status(405).end(`Method ${req.method} Not Allowed`);

    const { email, password } = await req.body;
    try {
        var apiRequest = {
            requestId: uuidv4(),
            email: email,
            password: password,
        };
        console.log("apiRequest", apiRequest);
        Axios.post(process.env.BASE_SERVICE_API + "/Auth/Login", apiRequest)
            .then((apiResponse: any) => {
                let { data } = apiResponse;
                res.json(data);
            })
            .catch((err: any) => {
                console.log(err);
                res.status(500).json(err);
            });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

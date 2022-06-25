import { AxiosError } from "axios";
import { ApiCaller } from "./apiCaller";

const ValidateResetPasswordKey = async (key: string) => {
    var result = await ApiCaller({
        method: "POST",
        url: "/auth/validateResetPasswordKey",
        req: { key },
    })
        .then((apiResponse: any) => {
            return apiResponse;
        })
        .catch((err: AxiosError) => {
            return {
                isSuccess: false,
                errors: [{ code: err.status, message: err.message }],
            };
        });
    return result;
};

export { ValidateResetPasswordKey };

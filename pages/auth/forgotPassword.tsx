//#region Required
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
//#endregion

//#region UI Components
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
//#endregion

//#region Types
//#endregion

//#region service
import CredinityTextField from "@/components/inputs/CredinityTextField";
import LanguageChanger from "@/components/inputs/LanguageChanger";
import PageContainer from "@/components/layouts/PageContainer";
import axios from "axios";
//#endregion

const ForgotPasswordPage: NextPage = () => {
    const [email, setEmail]: [string, Function] = useState("");
    const [showPassword, setShowPassword]: [boolean, Function] =
        useState(false);
    const [error, setError]: [string, Function] = useState("");
    const [requestSuccess, setRequestSuccess]: [boolean, Function] =
        useState(false);
    const [isLoading, setIsLoading]: [boolean, Function] = useState(false);

    const onResetPasswordClicked = async () => {
        setIsLoading(true);
        setError("");
        if (!validateEmail(email)) {
            setError("Invalid email address format");
            setIsLoading(false);
            return;
        }

        axios
            .post("/api/auth/sendResetPasswordEmail", {
                email,
            })
            .then((res: any) => {
                console.log("sendResetPasswordEmail:", res);
                if (res.data.isSuccess == false) {
                    let errorMessage =
                        res.data.errors[0]?.message ??
                        "Unknown error, Please try again.";
                    setError(errorMessage);
                    setIsLoading(false);
                    return;
                }
                setRequestSuccess(true);
                setIsLoading(false);
                return;
            })
            .catch((err: any) => {
                console.error("sendResetPasswordEmail:", err);
                setError(err.message);
                setIsLoading(false);
            });
    };

    const validateEmail = (email: string) => {
        const re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <PageContainer>
            <Grid
                container
                direction="column"
                justifyContent="center"
                minHeight="90vh"
                sx={{ px: "40px" }}
            >
                <Grid item alignSelf="center" sx={{ mb: 0 }}>
                    <Image
                        src="/img/logo/credinity-tr-logo.png"
                        alt="credinity logo"
                        width={100}
                        height={100}
                    />
                </Grid>
                <Grid item>
                    <Typography
                        variant="h1"
                        align="center"
                        fontSize="1.4rem"
                        fontWeight="medium"
                    >
                        Forgot Password
                    </Typography>
                </Grid>
                <Grid item sx={{ mt: 1, px: 1 }}>
                    <Typography
                        variant="body1"
                        align="center"
                        fontWeight="bold"
                    >
                        Please enter the email
                    </Typography>
                    <Typography
                        variant="body1"
                        align="center"
                        fontWeight="bold"
                    >
                        you use to sign in to Credinity.
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{ mt: 1 }}>
                    <CredinityTextField
                        label="Email"
                        textFieldProps={{
                            onChange: (e: any) => setEmail(e.target.value),
                            disabled: isLoading || requestSuccess,
                            placeholder: "Email",
                            value: email,
                            error: !!error,
                            helperText: error,
                        }}
                    />
                </Grid>
                <Grid
                    item
                    container
                    xs={12}
                    sx={{ mt: 2 }}
                    justifyContent="center"
                >
                    {isLoading ? (
                        <CircularProgress />
                    ) : requestSuccess ? (
                        <Typography color="#1B9B41" fontWeight="bold">
                            Password reset request has been submitted. Please
                            Check Your Email
                        </Typography>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={isLoading}
                            onClick={onResetPasswordClicked}
                            style={{ width: "100%" }}
                        >
                            <Typography color="#FFFFFF">CONTINUE</Typography>
                        </Button>
                    )}
                </Grid>
            </Grid>
            <LanguageChanger />
        </PageContainer>
    );
};
export default ForgotPasswordPage;

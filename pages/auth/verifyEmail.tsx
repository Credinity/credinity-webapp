//#region Required
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
//#endregion

//#region UI Components
import { Grid, Button, Typography, CircularProgress } from "@mui/material";
//#endregion

//#region Types
//#endregion

//#region service
import LanguageChanger from "@/components/input/LanguageChanger";
import CredinityTextField from "@/components/input/CredinityTextField";
import PageContainer from "@/components/layout/PageContainer";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
//#endregion

const VerifyEmailPage: NextPage = () => {
    const router = useRouter();
    const [activationCompleted, setActivationCompleted]: [boolean, Function] =
        useState(false);
    const [activationFailed, setActivationFailed]: [boolean, Function] =
        useState(false);
    const [errorMessage, setErrorMessage]: [boolean, Function] =
        useState(false);

    useEffect(() => {
        if (!router.isReady) return;
        activateUser();
    }, [router.isReady]);

    const activateUser = () => {
        const { verificationKey } = router.query;
        setActivationFailed(false);
        setActivationCompleted(false);
        var requestObject = {
            verificationKey,
        };
        console.log("[REQUEST]", requestObject);
        axios
            .post("/api/auth/activateUser", requestObject)
            .then((res: any) => {
                console.log("[RESPONSE]", res);
                if (res.data.isSuccess == false) {
                    let errorMessage =
                        res.data.errors[0]?.message ??
                        "Unknown error, Please try again.";
                    setErrorMessage(errorMessage);
                    setActivationFailed(true);
                    return;
                }
                setActivationCompleted(true);
                setActivationFailed(false);
            })
            .catch((err) => {
                console.error("activateUser:", err);
                setErrorMessage(err.message);
                setActivationFailed(true);
            });
    };

    return (
        <PageContainer>
            <Grid
                container
                direction="column"
                justifyContent="center"
                minHeight="100vh"
                sx={{ px: "40px" }}
            >
                <Grid item alignSelf="center" sx={{ mb: 0 }}>
                    <Image
                        src={"/../public/img/credinity-tr-logo.png"}
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
                        Email Verification
                    </Typography>
                </Grid>
                <Grid item sx={{ mt: 1 }}>
                    <Typography
                        variant="h2"
                        align="center"
                        fontSize="1rem"
                        fontWeight="medium"
                        color={
                            activationCompleted
                                ? "success"
                                : activationFailed
                                ? "error"
                                : ""
                        }
                    >
                        {activationCompleted
                            ? "Verification Completed"
                            : activationFailed
                            ? "Verification Failed"
                            : "Verifying Email"}
                    </Typography>
                </Grid>
                {activationFailed ? (
                    <Grid item sx={{ mt: 1 }}>
                        <Typography
                            color="error"
                            align="center"
                            fontWeight="medium"
                        >
                            {errorMessage}
                        </Typography>
                    </Grid>
                ) : null}
                <Grid item xs="auto" alignSelf="center" sx={{ mt: 2 }}>
                    {activationCompleted ? (
                        <Link href="/auth/signIn">
                            <Button>Sign In</Button>
                        </Link>
                    ) : activationFailed ? (
                        <Button onClick={() => activateUser()}>Retry</Button>
                    ) : (
                        <CircularProgress />
                    )}
                </Grid>
            </Grid>
            <LanguageChanger />
        </PageContainer>
    );
};
export default VerifyEmailPage;

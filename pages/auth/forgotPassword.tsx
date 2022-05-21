//#region Required
import type { InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import {
    FunctionComponent,
    MouseEventHandler,
    ReactComponentElement,
    ReactElement,
    useState,
} from "react";
//#endregion

//#region UI Components
import {
    Grid,
    TextField,
    Link,
    Button,
    Card,
    CardContent,
    Typography,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
    Checkbox,
    FormGroup,
    FormControlLabel,
    CircularProgress,
    Container,
    Divider,
    TextFieldProps,
    Menu,
    MenuItem,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import {
    VisibilityOff,
    Visibility,
    Label,
    Facebook,
    FacebookRounded,
    Google,
    ArrowDropDown,
} from "@mui/icons-material";
//#endregion

//#region Types
//#endregion

//#region service
import axios from "axios";
import { AnyAaaaRecord } from "dns";
import LanguageChanger from "@/components/input/LanguageChanger";
import PageContainer from "@/components/layout/pageContainer";
import CredinityTextField from "@/components/input/CredinityTextField";
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
        setTimeout(() => {
            setIsLoading(false);
            if (Math.random() > 0.5) {
                setError("Cannot submit request. Please try again later.");
                return;
            }
            setRequestSuccess(true);
        }, 1500);
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

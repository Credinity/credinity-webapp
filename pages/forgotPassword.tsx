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
import styles from "../styles/Home.module.css";
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
import { CredinityLogoImg } from "../public/static/images";
//#endregion

//#region Types
//#endregion

//#region service
import axios from "axios";
import { AnyAaaaRecord } from "dns";
//#endregion

const LoginPage: NextPage = () => {
    // const LoginPage: NextPage = () => {
    //     const session = new SessionModel();
    const [email, setEmail]: [string, Function] = useState("");
    const [showPassword, setShowPassword]: [boolean, Function] =
        useState(false);
    const [error, setError]: [string, Function] = useState("");
    const [requestSuccess, setRequestSuccess]: [bool, Function] =
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
        <TempContainer>
            <Grid
                container
                direction="column"
                justifyContent="center"
                minHeight="100vh"
                sx={{ px: "40px" }}
            >
                <Grid item>
                    <Typography variant="h1" align="center">
                        Reset Password
                    </Typography>
                </Grid>
                <Grid item sx={{ mt: 1 }}>
                    <Typography variant="body1" align="center" color="#9A9A9A">
                        Enter your registered email address with credinity and
                        we will email you a link to reset your password
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
                <Grid item container xs={12} justifyContent="center">
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
                            Login
                        </Button>
                    )}
                </Grid>
            </Grid>
            <LanguageChanger />
        </TempContainer>
    );
};
export default LoginPage;

const TempContainer: any = (props: any) => {
    const theme = createTheme();
    theme.typography.h1 = {
        fontSize: "1.2rem",
    };
    theme.typography.body1 = {
        fontSize: "0.8rem",
    };
    theme.typography["label"] = {
        fontSize: "0.8rem",
    };

    return (
        <ThemeProvider theme={theme}>
            <div style={{ height: "100vh" }}>
                <Head>
                    <title>Login</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                {props.children}
            </div>
        </ThemeProvider>
    );
};

const CredinityLabel: FunctionComponent<any> = (props: any) => {
    let baseStyle = { ...props.style, fontWeight: "bold" };
    return <Typography variant="label" {...props} style={baseStyle} />;
};

const CredinityPillButton: FunctionComponent<any> = (props: any) => {
    let baseStyle = {
        ...props.style,
        textTransform: "none",
        width: "100%",
        borderRadius: "50px",
    };
    console.log(props);
    return (
        <Button
            variant="outlined"
            color="secondary"
            style={baseStyle}
            {...props}
        >
            {props.children}
        </Button>
    );
};

const CredinityTextField: FunctionComponent<any> = ({
    label,
    labelProps,
    textFieldProps,
}: {
    label: string;
    labelProps: any;
    textFieldProps: TextFieldProps;
}) => {
    return (
        <>
            {label ? <CredinityLabel>{label}</CredinityLabel> : null}
            <TextField
                sx={{ my: "10px" }}
                variant="outlined"
                name="email"
                fullWidth
                inputProps={{
                    style: { padding: "5px 20px 5px 20px" },
                }}
                {...textFieldProps}
            />
        </>
    );
};

const LanguageChanger: FunctionComponent<any> = (props: any) => {
    const [lang, setLang] = useState("EN");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChangeLang = (newLang: string) => {
        setLang(newLang);
        handleClose();
    };

    const getFullLang = (langAbbrv: string) => {
        switch (langAbbrv) {
            case "TH":
                return "Thai";
            case "EN":
            default:
                return "English";
        }
    };
    return (
        <Grid
            container
            style={{ position: "absolute", bottom: "20px" }}
            justifyContent="center"
        >
            <Grid item xs="auto">
                <Typography display="inline" fontWeight="bold">
                    Choose Language:
                </Typography>
                <Button
                    onClick={handleClick}
                    style={{
                        textTransform: "none",
                        color: "black",
                        fontWeight: "bold",
                    }}
                >
                    {getFullLang(lang)} <ArrowDropDown />
                </Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={(e) => handleChangeLang("EN")}>
                        English
                    </MenuItem>
                    <MenuItem
                        onClick={(e) => handleChangeLang("TH")}
                        disabled={true}
                    >
                        Thai
                    </MenuItem>
                </Menu>
            </Grid>
        </Grid>
    );
};

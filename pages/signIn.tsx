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
//#endregion

const LoginPage: NextPage = () => {
    // const LoginPage: NextPage = () => {
    //     const session = new SessionModel();
    const [email, setEmail]: [string, Function] = useState("");
    const [password, setPassword]: [string, Function] = useState("");
    const [showPassword, setShowPassword]: [boolean, Function] =
        useState(false);
    const [error, setError]: [string, Function] = useState("");
    const [isLoading, setIsLoading]: [boolean, Function] = useState(false);

    const onLoginClicked = async () => {
        setIsLoading(true);
        axios
            .post("/api/auth/login", {
                email,
                password,
            })
            .then((res) => {
                console.log({ res });
                window.location.href = "/user/profile";
            })
            .catch((err) => {
                setError(err.response.data.message);
                setIsLoading(false);
            });
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
                <Grid item alignSelf="center" sx={{ mt: "40px", mb: "30px" }}>
                    <Image
                        src={"/" + CredinityLogoImg}
                        alt="credinity logo"
                        width={100}
                        height={100}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        disabled={true}
                        variant="outlined"
                        color="secondary"
                        style={{
                            textTransform: "none",
                            width: "100%",
                            borderRadius: "50px",
                        }}
                    >
                        <FacebookRounded sx={{ mr: 1 }} />
                        Sign up with Facebook
                    </Button>
                </Grid>
                <Grid item xs={12} sx={{ mt: "15px", mb: "30px" }}>
                    <CredinityPillButton disabled={true}>
                        <Google sx={{ mr: 1 }} />
                        Sign up with Google
                    </CredinityPillButton>
                </Grid>
                <Grid container direction="row" xs={12} alignItems="center">
                    <Grid item xs={true}>
                        <Divider />
                    </Grid>
                    <Grid item xs="auto" sx={{ px: 2 }}>
                        or
                    </Grid>
                    <Grid item xs={true}>
                        <Divider />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <CredinityTextField
                        label={"Email"}
                        textFieldProps={{
                            onChange: (e) => setEmail(e.target.value),
                            placeholder: "Email",
                            value: email,
                            disabled: isLoading,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CredinityTextField
                        label={"Password"}
                        textFieldProps={{
                            placeholder: "Password",
                            name: "password",
                            type: showPassword ? "text" : "password",
                            onChange: (e) => setPassword(e.target.value),
                            value: password,
                            disabled: isLoading,
                        }}
                    />
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={showPassword}
                                    disabled={isLoading}
                                    onChange={handleClickShowPassword}
                                />
                            }
                            label="Show Password"
                        />
                    </FormGroup>
                </Grid>
                <Grid item container xs={12} justifyContent="center">
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={isLoading}
                            onClick={onLoginClicked}
                            style={{ width: "100%" }}
                        >
                            Login
                        </Button>
                    )}
                </Grid>
                <Grid item xs={12} alignSelf="center" sx={{ mt: "15px" }}>
                    <Link href="/forgotPassword" color="inherit">
                        <Typography fontWeight="bold">
                            Forgot your password?
                        </Typography>
                    </Link>
                </Grid>
                <Grid item xs={12} alignSelf="center" sx={{ mt: "15px" }}>
                    <Typography
                        display="inline"
                        fontWeight="bold"
                        sx={{ mr: 1 }}
                    >
                        Don't have an account?
                    </Typography>
                    <Link href="/signup" color="inherit">
                        <Typography display="inline" fontWeight="bold">
                            Sign up
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
            <LanguageChanger />
        </TempContainer>
    );
};
export default LoginPage;

const TempContainer: any = (props: any) => {
    return (
        <div style={{ height: "100vh" }}>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {props.children}
        </div>
    );
};

const CredinityLabel: FunctionComponent<any> = (props: any) => {
    let baseStyle = { ...props.style, fontWeight: "bold" };
    return <label {...props} style={baseStyle} />;
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

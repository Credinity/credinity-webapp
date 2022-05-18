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
} from "@mui/material";
import { FacebookRounded, Google, ArrowDropDown } from "@mui/icons-material";
import { CredinityLogoTr } from "@/public/constants/img.constant";
import PageContainer from "@/components/layout/pageContainer";
import CredinityTextField from "@/components/input/CredinityTextField";
import CredinityPillButton from "@/components/input/CredinityPillButton";
import LanguageChanger from "@/components/input/LanguageChanger";
//#endregion

//#region Types
//#endregion

//#region service
import axios from "axios";
//#endregion

const LoginPage: NextPage = () => {
  const [email, setEmail]: [string, Function] = useState("");
  const [password, setPassword]: [string, Function] = useState("");
  const [confirmPassword, setConfirmPassword]: [string, Function] =
    useState("");
  const [phoneNo, setPhoneNo]: [string, Function] = useState("");
  const [error, setError]: [string, Function] = useState("");
  const [requestSuccess, setRequestSuccess]: [boolean, Function] =
    useState(false);
  const [isLoading, setIsLoading]: [boolean, Function] = useState(false);
  const onLoginClicked = async () => {
    setIsLoading(true);
    setError("");
    if (!validateInput()) {
      setIsLoading(false);
      return;
    }

    axios
      .post("/api/auth/register", {
        email,
        password,
      })
      .then((res: any) => {
        console.log("res.data", res.data);
        if (res.data.isSuccess == false) {
          let errorMessage =
            res.data.errors[0]?.message ?? "Unknown error, Please try again.";
          setError(errorMessage);
          setIsLoading(false);
          return;
        }
        setRequestSuccess(true);
        setIsLoading(false);
        return;
      })
      .catch((err: any) => {
        setError(err.response.data.message);
        setIsLoading(false);
      });
  };

  const validateInput = () => {
    if (!email) {
      setError("Email is required");
      return false;
    }
    if (!password) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  return (
    <PageContainer
      pageName="Sign Up"
      loading={requestSuccess}
      loadingMessage="Redirecting..."
    >
      <Grid
        container
        direction="column"
        minHeight="100vh"
        spacing={0}
        sx={{ pt: "5vh", px: "40px" }}
      >
        <Grid item alignSelf="center" sx={{ mb: "15px" }}>
          <Image
            src={CredinityLogoTr}
            alt="credinity logo"
            width={100}
            height={100}
          />
        </Grid>

        <Grid item xs={12} sx={{ mb: 1 }}>
          <CredinityTextField
            label={"Email"}
            textFieldProps={{
              onChange: (e: any) => setEmail(e.target.value),
              placeholder: "Email",
              value: email,
              disabled: isLoading,
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ mb: 1 }}>
          <CredinityTextField
            label={"Password"}
            textFieldProps={{
              placeholder: "Password",
              name: "password",
              type: "password",
              onChange: (e: any) => setPassword(e.target.value),
              value: password,
              disabled: isLoading,
            }}
          />
        </Grid>

        <Grid item xs={12} sx={{ mb: 1 }}>
          <CredinityTextField
            label={"Confirm Password"}
            textFieldProps={{
              placeholder: "Confirm Password",
              name: "confirmPassword",
              type: "password",
              onChange: (e: any) => setConfirmPassword(e.target.value),
              value: confirmPassword,
              disabled: isLoading,
            }}
          />
        </Grid>

        <Grid item xs={12} sx={{ mb: 1 }}>
          <CredinityTextField
            label={"Phone Number"}
            textFieldProps={{
              placeholder: "Phone number",
              name: "phoneNumber",
              type: "number",
              onChange: (e: any) => setPhoneNo(e.target.value),
              value: phoneNo,
              disabled: isLoading,
            }}
          />
        </Grid>

        {error ? (
          <Grid item xs={12} alignSelf="center" sx={{ mb: "20px" }}>
            <Typography color="red">{error}</Typography>
          </Grid>
        ) : null}

        <Grid
          item
          container
          xs={12}
          justifyContent="center"
          sx={{ mt: "10px", mb: "20px" }}
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              color="primary"
              disabled={isLoading}
              onClick={onLoginClicked}
              style={{
                width: "100%",
                color: "white",
              }}
            >
              <Typography fontWeight="regular">SIGN UP</Typography>
            </Button>
          )}
        </Grid>

        <Grid item xs={12} alignSelf="center" sx={{ mt: "5px" }}>
          <Typography display="inline" fontWeight="medium" sx={{ mr: 1 }}>
            Already have an account?
          </Typography>
          <Link href="/login" color="primary">
            <Typography display="inline" color="primary" fontWeight="medium">
              Sign in
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </PageContainer>
  );
};
export default LoginPage;

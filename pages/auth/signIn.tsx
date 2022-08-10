//#region Required
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
//#endregion

//#region UI Components
import {
  Grid,
  Link,
  Button,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";
import { FacebookRounded, Google } from "@mui/icons-material";
import CredinityTextField from "@/components/inputs/CredinityTextField";
import CredinityPillButton from "@/components/inputs/CredinityPillButton";
import LanguageChanger from "@/components/inputs/LanguageChanger";
import PageContainer from "@/components/layouts/PageContainer";
//#endregion

//#region Types
//#endregion

//#region service
import axios from "axios";
import { useRouter } from "next/router";
import jsonwebtoken from "jsonwebtoken";
import Cookies from "universal-cookie";
import { Authorization, UserID } from "@/models/constants/key.constant";
//#endregion

const SignInPage: NextPage = () => {
  const router = useRouter();
  const [email, setEmail]: [string, Function] = useState("");
  const [password, setPassword]: [string, Function] = useState("");
  const [showPassword, setShowPassword]: [boolean, Function] = useState(false);
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
      .post("/api/auth/login", {
        email,
        password,
      })
      .then((res: any) => {
        if (res.data.isSuccess == false) {
          let errorMessage =
            res.data.errors[0]?.message ?? "Unknown error, Please try again.";
          setError(errorMessage);
          setIsLoading(false);
          return;
        }
        const cookies = new Cookies();
        cookies.set(Authorization, res.data.userToken, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "strict",
        });
        cookies.set(UserID, res.data.user.userId, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "strict",
        });
        setRequestSuccess(true);
        setIsLoading(false);
        router.push("/");
        return;
      })
      .catch((err: any) => {
        setError(err.message);
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <PageContainer
      pageName="Sign In"
      loading={requestSuccess}
      loadingMessage="Redirecting..."
    >
      <Grid
        container
        direction="column"
        minHeight="90vh"
        spacing={0}
        sx={{ pt: "18vh", px: "40px" }}
      >
        <Grid item alignSelf="center" sx={{ mb: "50px" }}>
          <Image
            src="/img/logo/credinity-tr-logo.png"
            alt="credinity logo"
            width={100}
            height={100}
          />
        </Grid>
        <Grid item xs={12}>
          <CredinityPillButton disabled={true}>
            <FacebookRounded sx={{ mr: 1 }} style={{ fontSize: "medium" }} />
            <Typography variant="body2" fontWeight="medium">
              Sign in with Facebook
            </Typography>
          </CredinityPillButton>
        </Grid>
        <Grid item xs={12} sx={{ mt: "20px", mb: "30px" }}>
          <CredinityPillButton disabled={true}>
            <Google sx={{ mr: 1 }} style={{ fontSize: "medium" }} />
            <Typography variant="body2" fontWeight="medium">
              Sign in with Google
            </Typography>
          </CredinityPillButton>
        </Grid>
        <Grid container direction="row" item xs={12} alignItems="center">
          <Grid item xs={true}>
            <Divider />
          </Grid>
          <Grid item xs="auto" sx={{ px: 2 }}>
            <Typography variant="body2">or</Typography>
          </Grid>
          <Grid item xs={true}>
            <Divider />
          </Grid>
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
        <Grid item xs={12}>
          <CredinityTextField
            label={"Password"}
            textFieldProps={{
              placeholder: "Password",
              name: "password",
              type: showPassword ? "text" : "password",
              onChange: (e: any) => setPassword(e.target.value),
              value: password,
              disabled: isLoading,
            }}
          />
          {/* <FormGroup>
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
                    </FormGroup> */}
        </Grid>
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
              <Typography fontWeight="regular">Login</Typography>
            </Button>
          )}
        </Grid>
        {error ? (
          <Grid item xs={12} alignSelf="center" sx={{ mb: "20px" }}>
            <Typography color="red">{error}</Typography>
          </Grid>
        ) : null}
        <Grid item xs={12} alignSelf="center">
          <Link href="/auth/forgotPassword" color="inherit">
            <Typography fontWeight="medium">Forgot your password?</Typography>
          </Link>
        </Grid>
        <Grid item xs={12} alignSelf="center" sx={{ mt: "15px" }}>
          <Typography display="inline" fontWeight="medium" sx={{ mr: 1 }}>
            Don&apos;t have an account?
          </Typography>
          <Link href="/auth/signUp" color="inherit">
            <Typography display="inline" fontWeight="medium">
              Sign up
            </Typography>
          </Link>
        </Grid>
      </Grid>
      <LanguageChanger />
    </PageContainer>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  var jwt = jsonwebtoken.decode(req.cookies.authorization);
  if (jwt) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
};
export default SignInPage;

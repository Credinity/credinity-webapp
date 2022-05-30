//#region Required
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
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
import PageContainer from "@/components/layout/PageContainer";
import CredinityTextField from "@/components/input/CredinityTextField";
import jsonwebtoken from "jsonwebtoken";
//#endregion

const ResetPasswordPage: NextPage<{
  resetPassKey: string;
  keyValidationError: string;
}> = ({
  resetPassKey,
  keyValidationError,
}: {
  resetPassKey: string;
  keyValidationError: string;
}) => {
  const [newPassword, setNewPassword]: [string, Function] = useState("");
  const [confirmPassword, setConfirmPassword]: [string, Function] =
    useState("");
  const [showPassword, setShowPassword]: [boolean, Function] = useState(false);
  const [error, setError]: [string, Function] = useState("");
  const [passwordFormatError, setPasswordFormatError]: [string, Function] =
    useState("");
  const [requestSuccess, setRequestSuccess]: [boolean, Function] =
    useState(false);
  const [isLoading, setIsLoading]: [boolean, Function] = useState(false);

  const onResetPasswordClicked = async () => {
    setIsLoading(true);
    setError("");
    if (!validatePassword(newPassword, confirmPassword)) {
      setIsLoading(false);
      return;
    }
    let requesObj = {
      key: resetPassKey,
      newPassword,
    };
    console.log("[REQUEST] resetPassword", requesObj);
    axios
      .post("/api/auth/resetPassword", requesObj)
      .then((res) => {
        var { data } = res;
        console.log("res.data", data);
        if (data.isSuccess == false) {
          let errorMessage =
            data.errors[0]?.message ?? "Unknown error, Please try again.";
          setError(errorMessage);
          setIsLoading(false);
          return;
        }
        setRequestSuccess(true);
      })
      .catch((err) => {
        console.error(err);
        setError(
          "Cannot reset password at the moment. Please try again later."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const validatePasswordFormat = (password: string) => {
    var letterRegex = /^[a-zA-Z0-9]{0,}$/;
    var regex = /^[a-zA-Z0-9]{8,24}$/;
    if (!letterRegex.test(password)) {
      setPasswordFormatError("Password must use only letters and numbers.");
      return false;
    }
    if (!regex.test(password)) {
      setPasswordFormatError("Password must be between 8 and 24 letters.");
      return false;
    }
    setPasswordFormatError("");
    return true;
  };
  const validatePassword = (password1: string, password2: string) => {
    if (validatePasswordFormat(password1) == false) {
      return false;
    }
    if (password1 !== password2) {
      setError("Passwords do not match");
      return false;
    }
    return true;
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
            Reset Password
          </Typography>
        </Grid>
        <Grid item sx={{ mt: 1, px: 1 }}>
          <Typography variant="body1" align="center" fontWeight="bold">
            Please enter your new password.
          </Typography>
          <Typography variant="body2" align="center" fontWeight="bold">
            Password must contains only letters and numbers. And must be between
            8 and 24 letters.
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 1 }}>
          <CredinityTextField
            label="New Password"
            textFieldProps={{
              onChange: (e: any) => {
                setNewPassword(e.target.value);
                validatePasswordFormat(e.target.value);
              },
              type: showPassword ? "text" : "password",
              disabled: isLoading || requestSuccess || !!keyValidationError,
              placeholder: "New Password",
              value: newPassword,
              error: !!passwordFormatError,
              helperText: passwordFormatError,
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 1 }}>
          <CredinityTextField
            label="Confirm Password"
            textFieldProps={{
              onChange: (e: any) => setConfirmPassword(e.target.value),
              type: showPassword ? "text" : "password",
              disabled: isLoading || requestSuccess || !!keyValidationError,
              placeholder: "Confirm Password",
              value: confirmPassword,
              error: !!error,
              helperText: error,
            }}
          />
        </Grid>
        <Grid item container xs={12} sx={{ mt: 2 }} justifyContent="center">
          {isLoading ? (
            <CircularProgress />
          ) : requestSuccess ? (
            <>
              <Typography color="#1B9B41" fontWeight="bold">
                Password reset completed. Please try logging in with your new
                password.
              </Typography>
              <Link href="/auth/signIn">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "100%" }}
                  onClick={() => setIsLoading(true)}
                  sx={{ mt: 1 }}
                >
                  <Typography color="#FFFFFF">Sign In</Typography>
                </Button>
              </Link>
            </>
          ) : keyValidationError ? (
            <Typography color="#FF0000" fontWeight="bold" align="center">
              {keyValidationError}
            </Typography>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={onResetPasswordClicked}
              disabled={!!keyValidationError}
              style={{ width: "100%" }}
            >
              <Typography color="#FFFFFF">CONFIRM</Typography>
            </Button>
          )}
        </Grid>
      </Grid>
      <LanguageChanger />
    </PageContainer>
  );
};
export default ResetPasswordPage;
export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  var jwt = jsonwebtoken.decode(req.cookies.authorization);
  if (jwt) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }
  var { key } = query;
  var requestObj = {
    key: key,
  };
  let result = await axios
    .post(
      process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API +
        "/auth/validateResetPasswordKey",
      requestObj
    )
    .then((response) => {
      let { data } = response;
      if (data.isSuccess == false) {
        return {
          resetPassKey: key,
          keyValidationError: data.errors[0].message,
        };
      }

      return {
        resetPassKey: key,
        keyValidationError: "",
      };
    })
    .catch((error) => {
      return {
        resetPassKey: key,
        keyValidationError:
          "Cannot validate reset password token. Please try again later.",
      };
    });
  return {
    props: result,
  };
};

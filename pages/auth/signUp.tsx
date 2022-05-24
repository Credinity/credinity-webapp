import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Formik, Form, FormikProps } from "formik";
import { Box, Checkbox, CircularProgress, Grid, Link } from "@mui/material";
import { Ladybug } from "@/public/constants/color.constant";
import FormikTextField from "@/components/input/FormikTextField";
import Image from "next/image";
import PageContainer from "@/components/layout/pageContainer";
import { validEmail, validPassword } from "helpers/client/regexValidation";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "next/router";
import { SignUpReq } from "@/models/auth.model";
import { signUpAsync } from "@/store/slices/userSlice";

interface SignUpProps {
  email: string;
  password: string;
  confirmPass: string;
  phoneNo: string;
  confirmOtp: string;
  isAgreeCond: boolean;
}

const initialValues: SignUpProps = {
  email: "",
  password: "",
  confirmPass: "",
  phoneNo: "",
  confirmOtp: "",
  isAgreeCond: false,
};

export default function register() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [requestSuccess, setRequestSuccess]: [boolean, Function] =
    useState(false);
  const [error, setError]: [string, Function] = useState("");
  const [isSingUpReq, setIsSingUpReq]: [boolean, Function] = useState(false);
  const [isOtpReq, setIsOtpReq]: [boolean, Function] = useState(false);
  const [isLoading, setIsLoading]: [boolean, Function] = useState(false);
  let submitAction: string | undefined = undefined;

  const registerForm = ({
    values,
    setFieldValue,
    isValid,
    dirty,
    handleSubmit,
    handleChange,
  }: FormikProps<SignUpProps>) => {
    return (
      <Form onSubmit={handleSubmit}>
        <Typography fontWeight="medium" sx={{ mb: 1 }}>
          Email
        </Typography>
        <FormikTextField
          id="Email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          required
          fullWidth
          autoFocus
          sx={{ mb: 1 }}
          disabled={isLoading}
          onChange={handleChange}
          value={values.email}
        />
        <Typography fontWeight="medium" sx={{ my: 1 }}>
          Password
        </Typography>
        <FormikTextField
          id="Password"
          type="password"
          name="password"
          placeholder="Password"
          required
          fullWidth
          autoFocus
          sx={{ mb: 1 }}
          disabled={isLoading}
          onChange={handleChange}
          value={values.password}
        />

        <Typography fontWeight="medium" sx={{ my: 1 }}>
          Confirm Password
        </Typography>
        <FormikTextField
          id="ConfirmPassword"
          type="password"
          name="confirmPass"
          placeholder="Confirm Password"
          required
          fullWidth
          autoFocus
          sx={{ mb: 1 }}
          disabled={isLoading}
          onChange={handleChange}
          value={values.confirmPass}
        />

        <Grid container spacing={1}>
          <Grid item xs={8} sx={{ mb: 1 }}>
            <Typography fontWeight="medium" sx={{ my: 1 }}>
              Phone Number
            </Typography>
            <FormikTextField
              id="PhoneNumber"
              type="text"
              name="phoneNo"
              placeholder="XXX-XXX-XXXX"
              required
              fullWidth
              autoFocus
              sx={{ mb: 1 }}
              onChange={handleChange}
              value={values.phoneNo}
              disabled={true}
              //disabled={isLoading}
            />
          </Grid>
          <Grid
            item
            container
            xs={4}
            justifyContent="	flex-start"
            sx={{ mt: 4.7, mb: 2.3 }}
          >
            {isOtpReq ? (
              <CircularProgress />
            ) : (
              <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                disabled={true}
                onClick={() => {
                  submitAction = "otpAction";
                  handleSubmit();
                }}
              >
                <Typography variant="body2">Request OTP</Typography>
              </Button>
            )}
          </Grid>
        </Grid>

        <Typography fontWeight="medium" sx={{ mb: 1 }}>
          Confirm OTP
        </Typography>
        <FormikTextField
          id="ConfirmOtp"
          type="Text"
          name="confirmOtp"
          placeholder="Confirm OTP"
          required
          fullWidth
          autoFocus
          sx={{ mb: 1 }}
          onChange={handleChange}
          value={values.confirmOtp}
          disabled={true}
          //disabled={isLoading}
        />

        {error ? (
          <Grid
            item
            xs={12}
            justifyContent="center"
            alignItems="center"
            display="flex"
            sx={{ mb: 2 }}
          >
            <Typography variant="h4" color={Ladybug}>
              {error}
            </Typography>
          </Grid>
        ) : null}

        <Grid container sx={{ ml: 5, my: 1.3 }} alignItems="center">
          <Grid
            item
            xs={1}
            sx={{ mr: 1 }}
            justifyContent="center"
            alignItems="center"
            display="flex"
          >
            <Box
              sx={{
                backgroundColor:
                  isSingUpReq && values.isAgreeCond == false
                    ? Ladybug
                    : "transparent",
              }}
            >
              <Checkbox
                id="isAgreeCond"
                name="isAgreeCond"
                checked={values.isAgreeCond}
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={8}
            justifyContent="center"
            alignItems="center"
            display="flex"
          >
            <Box>
              <Typography display="inline" sx={{ mr: 1 }}>
                I agree to Credinity&apos;s
              </Typography>
              <Link href="" color="primary">
                <Typography display="inline" color="primary">
                  Service Agreement
                </Typography>
              </Link>
              <Typography display="inline" sx={{ mx: 1 }}>
                and
              </Typography>
              <Link href="" color="primary">
                <Typography display="inline" color="primary">
                  Privacy policy
                </Typography>
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Grid item container xs={12} justifyContent="center" sx={{ mb: 2 }}>
          {isSingUpReq ? (
            <CircularProgress />
          ) : (
            <Button
              type="button"
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                submitAction = "signUpAction";
                handleSubmit();
              }}
            >
              <Typography>SIGN UP</Typography>
            </Button>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ mt: 2 }}
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <Typography display="inline" fontWeight="medium" sx={{ mr: 1 }}>
            Already have an account?
          </Typography>
          <Link href="" color="primary">
            <Typography display="inline" color="primary" fontWeight="medium">
              Sign in
            </Typography>
          </Link>
        </Grid>
      </Form>
    );
  };

  const validateInput = (values: SignUpProps) => {
    if (!values.email) {
      setError("Email is required");
      return false;
    }
    if (!validEmail.test(values.email)) {
      setError("Email is wrong format");
      return false;
    }
    if (values.password !== values.confirmPass) {
      setError("Mismatch password");
      return false;
    }
    if (!validPassword.test(values.password)) {
      setError("Password is wrong format (min 8, max 24)");
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
      <Grid container direction="column" minHeight="100vh" spacing={0}>
        <Grid item alignSelf="center" sx={{ mt: 4 }}>
          <Image
            src="/img/credinity-tr-logo.png"
            alt="credinity logo"
            width={100}
            height={100}
          />
        </Grid>
        <Grid item xs={12} sx={{ mx: 4 }}>
          <Formik
            initialValues={initialValues!}
            onSubmit={async (values) => {
              if (submitAction === "signUpAction") {
                alert(JSON.stringify(values));
                setIsSingUpReq(true);
                setIsLoading(true);
                if (validateInput(values)) {
                  const req: SignUpReq = {
                    email: values.email,
                    password: values.password,
                  };
                  //call dispatch
                  const res = await dispatch(signUpAsync(req));
                  console.log(JSON.stringify(res));
                }
                setIsSingUpReq(false);
              } else if (submitAction === "otpAction") {
                //todo OTP Service
                setIsOtpReq(true);
                setIsLoading(true);
                setIsOtpReq(false);
              } else {
                console.log("something wrong");
              }
              setIsLoading(false);
            }}
          >
            {(signUpProps) => registerForm(signUpProps)}
          </Formik>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

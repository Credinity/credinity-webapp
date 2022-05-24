import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Formik, Form, FormikProps } from "formik";
import { Box, Checkbox, CircularProgress, Grid, Link } from "@mui/material";
import { Gainsboro, Ladybug } from "@/public/constants/color.constant";
import FormikTextField from "@/components/input/FormikTextField";
import Image from "next/image";
import PageContainer from "@/components/layout/pageContainer";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "next/router";
import { SignUpFormProps, SignUpReq } from "@/models/auth.model";
import {
  setOtpProcessing,
  setSignUpProcessing,
  signUpAsync,
  userSelector,
  validateSignUp,
} from "@/store/slices/userSlice";
import { useSelector } from "react-redux";

const initialValues: SignUpFormProps = {
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
  const user = useSelector(userSelector);
  let submitAction: string | undefined = undefined;

  const registerForm = ({
    values,
    setFieldValue,
    isValid,
    dirty,
    handleSubmit,
    handleChange,
  }: FormikProps<SignUpFormProps>) => {
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
          disabled={user.isDisableInput}
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
          disabled={user.isDisableInput}
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
          disabled={user.isDisableInput}
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
              //todo : OTP Flow
              //disabled={user.isDisableInput}
            />
          </Grid>
          <Grid
            item
            container
            xs={4}
            justifyContent="	flex-start"
            sx={{ mt: 4.7, mb: 2.3 }}
          >
            {user.isOtpProcessing ? (
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

        {user.error ? (
          <Grid
            item
            xs={12}
            justifyContent="center"
            alignItems="center"
            display="flex"
            sx={{ mb: 2 }}
          >
            <Typography variant="h4" color={Ladybug}>
              {user.error}
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
            <Checkbox
              id="isAgreeCond"
              name="isAgreeCond"
              sx={{
                color: user.isRedCheckBox ? Ladybug : Gainsboro,
              }}
              checked={values.isAgreeCond}
              onChange={handleChange}
            />
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
          {user.isSignUpProcessing ? (
            <CircularProgress />
          ) : (
            <Button
              type="button"
              variant="contained"
              color="primary"
              fullWidth
              disabled={user.isSignUpProcessing}
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

  return (
    <PageContainer
      pageName="Sign Up"
      loading={user.isRequestSuccess}
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
                dispatch(setSignUpProcessing(true));
                dispatch(validateSignUp(values));
                if (user.isSignUpFormCorrect) {
                  const req: SignUpReq = {
                    email: values.email,
                    password: values.password,
                  };
                  //call dispatch
                  const res = await dispatch(signUpAsync(req));
                  console.log(`signup page =>${JSON.stringify(res)}`);
                }
                dispatch(setSignUpProcessing(false));
              } else if (submitAction === "otpAction") {
                dispatch(setOtpProcessing(true));
                //todo OTP Service
                dispatch(setOtpProcessing(false));
              } else {
                console.log("something wrong");
              }
            }}
          >
            {(signUpProps) => registerForm(signUpProps)}
          </Formik>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

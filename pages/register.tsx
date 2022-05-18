import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { TextField } from "formik-material-ui";
import { Formik, Form, Field, FormikProps } from "formik";
import Router from "next/router";
import { Box } from "@mui/material";
import { useAppDispatch } from "@/store/store";
import { signUpAsync } from "@/store/slices/userSlice";
type Props = {};

export default function RegisterPage({}: Props) {
  const dispatch = useAppDispatch();

  const showForm = ({
    values,
    setFieldValue,
    isValid,
    dirty,
    handleSubmit,
  }: FormikProps<any>) => {
    return (
      <Form onSubmit={handleSubmit}>
        <Field
          component={TextField}
          name="email"
          id="email"
          margin="normal"
          required
          fullWidth
          label="Email"
          autoComplete="email"
          autoFocus
        />
        <Field
          component={TextField}
          name="password"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        <Button type="submit" fullWidth variant="contained" color="primary">
          Register
        </Button>
      </Form>
    );
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 200 }}
            image="/static/img/next_register.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Formik
              initialValues={{ requestId: "", email: "", password: "" }}
              onSubmit={async (values) => {
                alert(JSON.stringify(values));
                const response = await dispatch(signUpAsync(values));
                if (response.meta.requestStatus === "rejected") {
                  alert("Register failed");
                } else {
                  alert(`res=> ${JSON.stringify(response)}`);
                  Router.push("/verifyemail");
                }
              }}
            >
              {(props) => showForm(props)}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </React.Fragment>
  );
}

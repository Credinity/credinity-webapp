import PageContainer from "@/components/layouts/PageContainer";
import { Button, Grid, Typography } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import jsonwebtoken from "jsonwebtoken";
import { useRouter } from "next/router";

const ProfilePage: NextPage = (props: any) => {
  const router = useRouter();
  const signOut = () => {
    router.push("/auth/signOut");
  };
  return (
    <PageContainer>
      <Grid container justifyContent="center">
        <Grid
          item
          xs="auto"
          alignSelf="center"
          alignItems="center"
          alignContent="center"
          sx={{ mt: 5 }}
        >
          <Typography>Welcome</Typography>
          <Button variant="outlined" color="error" onClick={signOut}>
            Sign Out
          </Button>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  var jwt = jsonwebtoken.decode(req.cookies.authorization);
  console.log("profile", { authorization: req.cookies.authorization, jwt });
  if (!jwt) {
    return {
      redirect: {
        destination: "/auth/signIn",
        permanent: false,
      },
    };
  }
  return { props: {} };
};
export default ProfilePage;

import CredinityFooter from "@/components/display/CredinityFooter";
import AppBarHeader from "@/components/layout/AppBarHeader";
import PageContainer from "@/components/layout/pageContainer";
import { White } from "@/public/constants/color.constant";
import { userSelector } from "@/store/slices/userSlice";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

export default function Index({}: Props) {
  const user = useSelector(userSelector);
  const [isReadMore, setIsReadMore]: [boolean, Function] = useState(false);
  const [isSignIn, setSignIn]: [boolean, Function] = useState(false);
  const [isSignUp, setSignUp]: [boolean, Function] = useState(false);
  return (
    <PageContainer
      pageName="Index"
      loading={user.isRequestSuccess}
      loadingMessage="Redirecting..."
    >
      <AppBarHeader />
      <Grid container direction="column" sx={{ paddingX: 3, maxWidth: "xs" }}>
        <Grid item xs={12} sx={{ mt: 1 }}>
          <Typography variant="h3" textAlign="center">
            Credinity, a P2P lending and investment service platform
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ paddingY: 2 }}>
          {isReadMore ? (
            <Stack alignItems="center">
              <CircularProgress />
            </Stack>
          ) : (
            <Button
              type="button"
              variant="contained"
              style={{
                backgroundColor: White,
                border: "1px solid #808080",
                color: "black",
                boxShadow: "none",
              }}
              fullWidth
              onClick={() => {
                setIsReadMore(true);
              }}
            >
              <Typography variant="h3">READ MORE</Typography>
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
          {/* <Image
            src=""
            alt=""
            width={1900}
            height={1600}
          /> */}

          <Paper
            elevation={3}
            sx={{
              minWidth: "80vw",
              minHeight: "55vh",
              backgroundColor: "lightgray",
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ paddingY: 2 }}>
          {isSignIn ? (
            <Stack alignItems="center">
              <CircularProgress />
            </Stack>
          ) : (
            <Button
              style={{
                backgroundColor: "#808080",
                color: White,
                textTransform: "none",
                fontWeight: "bold",
              }}
              fullWidth
              onClick={() => {
                setSignIn(true);
              }}
            >
              <Typography variant="h3">Sign In</Typography>
            </Button>
          )}
        </Grid>
        <Grid item xs={12} sx={{ paddingY: 1 }}>
          {isSignUp ? (
            <Stack alignItems="center">
              <CircularProgress />
            </Stack>
          ) : (
            <Button
              style={{
                backgroundColor: "#D3D3D3",
                color: "black",
                textTransform: "none",
                fontWeight: "bold",
              }}
              fullWidth
              onClick={() => {
                setSignUp(true);
              }}
            >
              <Typography variant="h3">Register</Typography>
            </Button>
          )}
        </Grid>
        <CredinityFooter />
      </Grid>
    </PageContainer>
  );
}

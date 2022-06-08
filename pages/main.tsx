import AppBarHeader from "@/components/layout/AppBarHeader";
import PageContainer from "@/components/layout/PageContainer";
import { pageSelector } from "@/store/slices/pageSlice";
import { Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const menuArray = [
  { name: "TestPath", path: "/auth/signUp" },
  { name: "INVESTOR", path: "" },
  { name: "LOAN", path: "" },
  { name: "NEWS", path: "" },
  { name: "ABOUT US", path: "" },
  { name: "PROFILE", path: "" },
];

export default function MainPage() {
  const page = useSelector(pageSelector);
  return (
    <PageContainer
      pageName="Index"
      loading={page.isRequestSuccess}
      loadingMessage="Redirecting..."
    >
      <AppBarHeader menuList={menuArray} />
      <Grid
        container
        direction="column"
        gridTemplateColumns="auto"
        sx={{ px: "40px" }}
        spacing={3}
      >
        <Grid
          item
          container
          justifyItems="center"
          alignItems="center"
          sx={{ mt: 1 }}
        >
          <Typography variant="h3" textAlign="center">
            Credinity, a P2P lending and investment service platform
          </Typography>
        </Grid>
        <Grid item container justifyItems="center" alignItems="center">
          {/* <Image
            src=""
            alt=""
            width={1900}
            height={1600}
          /> */}

          <Paper
            elevation={3}
            sx={{
              minWidth: "100%",
              minHeight: "55vh",
              backgroundColor: "lightgray",
            }}
          />
        </Grid>
        <Grid item>
          <Typography variant="h2">LOAN&amp;{<br />}INVESTER</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            style={{
              textTransform: "none",
              fontWeight: "bold",
            }}
            onClick={() => {}}
          >
            <Typography paddingLeft="10px" paddingRight="10px" variant="h3">
              Let&apos;s go
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

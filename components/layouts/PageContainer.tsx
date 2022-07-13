import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { FunctionComponent } from "react";
import CreadinityLoader from "@/components/displays/CreadinityLoader";

const PageContainer: FunctionComponent<any> = (props: any) => {
  return (
    <Box minHeight="100vh">
      <Head>
        <title>{props.pageName}</title>
        <link rel="icon" href="/img/logo/credinity-tr-logo.png" />
      </Head>
      {props.loading ? (
        <CreadinityLoader loadingMessage={props.loadingMessage} />
      ) : null}
      {props.backgroundColor ? (
        <Grid
          container
          justifyContent="center"
          sx={{ backgroundColor: props.backgroundColor }}
        >
          <Grid item xs={12} md={4} lg={3} xl={2}>
            {props.children}
          </Grid>
        </Grid>
      ) : (
        <Grid container justifyContent="center">
          <Grid item xs={12} md={4} lg={3} xl={2}>
            {props.children}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default PageContainer;

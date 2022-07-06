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
const CreadinityLoader: FunctionComponent<any> = ({
  loadingMessage,
}: {
  loadingMessage: string;
}) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      style={{
        zIndex: 999,
        position: "fixed",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        backgroundColor: "rgba(50, 50, 50, 0.50)",
      }}
    >
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            alignItems="center"
          >
            <Grid item xs="auto" alignSelf="center">
              <CircularProgress />
            </Grid>
            <Grid item xs={12} alignSelf="center">
              <Typography
                variant="h6"
                align="center"
                style={{ marginTop: "10px" }}
              >
                {loadingMessage ?? "Loading..."}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default PageContainer;

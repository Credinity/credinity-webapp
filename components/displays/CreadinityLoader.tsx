import {
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import React from "react";

type Props = { loadingMessage?: string };

export default function CreadinityLoader({ loadingMessage }: Props) {
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
}

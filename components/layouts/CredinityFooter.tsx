import * as React from "react";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

export default function CredinityFooter() {
  return (
    <Grid item container alignSelf="center" justifyContent="center">
      <Typography
        variant="body1"
        align="center"
        fontWeight="bold"
        sx={{ mt: "1.5rem" }}
      >
        ©2022 Credinity .. All right reserved
      </Typography>
    </Grid>
  );
}

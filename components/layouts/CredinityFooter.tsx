import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function CredinityFooter(props: any) {
  return (
    <Box width="100vw" {...props}>
      <Typography variant="body2" align="center" fontWeight="bold">
        ©2022 Credinity .. All right reserved
      </Typography>
    </Box>
  );
}

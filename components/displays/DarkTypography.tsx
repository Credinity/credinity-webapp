import * as React from "react";
import { AntiFlashWhite, Gray } from "@/public/constants/color.constant";
import { styled, Typography, TypographyProps } from "@mui/material";

const DarkTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: Gray,
  "&:hover": {
    color: AntiFlashWhite,
  },
}));

export default DarkTypography;

import {
  AntiFlashWhite,
  Diamond,
  Gainsboro,
  White,
} from "@/public/constants/color.constant";
import { Button, ButtonProps, styled, Typography } from "@mui/material";
import React, { MouseEventHandler } from "react";

const CredinityButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: White,
  "&:hover": {
    color: White,
    backgroundColor: Diamond,
  },
}));

export default function PrimaryButton(props: any) {
  return (
    <CredinityButton fullWidth variant="contained" {...props}>
      <Typography variant="button"> {props.children}</Typography>
    </CredinityButton>
  );
}

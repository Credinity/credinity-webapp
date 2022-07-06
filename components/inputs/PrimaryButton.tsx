import { Diamond, White } from "@/models/constants/color.constant";
import { Button, ButtonProps, styled, Typography } from "@mui/material";
import React from "react";

const CredinityButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: White,
  "&:hover": {
    color: White,
    backgroundColor: Diamond,
  },
}));

export default function PrimaryButton(props: any) {
  return (
    <CredinityButton variant="contained" {...props}>
      <Typography
        variant="button"
        justifyContent="center"
        alignItems="center"
        display="flex"
        sx={{ wordWrap: "break-word" }}
      >
        {props.children}
      </Typography>
    </CredinityButton>
  );
}

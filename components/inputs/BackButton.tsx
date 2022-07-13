import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Button, Typography, styled } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { Black } from "@/models/constants/color.constant";
import { useRouter } from "next/router";

type Props = {
  text?: string;
  path?: string;
  sxButton?: SxProps<Theme>;
};

export default function BackButton(props: Props) {
  let sxProps;
  const router = useRouter();
  if (props.sxButton == undefined) {
    //default value
    sxProps = { color: Black };
  } else {
    sxProps = props.sxButton;
  }
  return (
    <>
      {props.text != undefined ? (
        <Button
          variant="text"
          sx={sxProps}
          onClick={() => {
            props.path != undefined ? router.push(props.path) : router.back();
          }}
        >
          <ArrowBackIosIcon />
          <Typography variant="button">{props.text}</Typography>
        </Button>
      ) : (
        <IconButton
          sx={sxProps}
          onClick={() => {
            props.path != undefined ? router.push(props.path) : router.back();
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
      )}
    </>
  );
}

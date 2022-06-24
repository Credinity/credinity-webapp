import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import ImageHover from "@/components/displays/ImgHover";
import { StaticImageData } from "next/image";

type Props = {
  imgNormal: StaticImageData;
  imgHover: StaticImageData;
  imgAlt: string;
  title: string;
  detail: string;
};

export default function ImgDetailCard({
  imgNormal,
  imgHover,
  imgAlt,
  title,
  detail,
}: Props) {
  return (
    <Stack direction="column" justifyContent="center">
      <Stack alignItems="center" justifyContent="center">
        <ImageHover imgNormal={imgNormal} imgHover={imgHover} imgAlt={imgAlt} />
      </Stack>
      <Typography
        variant="h3"
        textAlign="center"
        sx={{ wordWrap: "break-word" }}
      >
        {title}
      </Typography>
      <Typography
        variant="caption"
        textAlign="start"
        sx={{ mt: 1, wordWrap: "break-word" }}
      >
        {detail}
      </Typography>
    </Stack>
  );
}

import { Stack, Typography } from "@mui/material";
import React from "react";
import ImageHover from "@/components/displays/ImgHover";
import { FeatureItem } from "@/models/content.model";

export default function ImgDetailCard(item: FeatureItem) {
  return (
    <Stack direction="column" justifyContent="center">
      <Stack alignItems="center" justifyContent="center">
        <ImageHover {...item} />
      </Stack>
      <Typography
        variant="h3"
        textAlign="center"
        sx={{ wordWrap: "break-word" }}
      >
        {item.title}
      </Typography>
      <Typography
        variant="caption"
        textAlign="start"
        sx={{ mt: 1, wordWrap: "break-word" }}
      >
        {item.detail}
      </Typography>
    </Stack>
  );
}

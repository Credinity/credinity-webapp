import { Box, Paper, Stack, Typography } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import ReadMoreText from "@/components/displays/ReadMoreText";

type Props = {
  imgContent: string;
  altImg: string;
  title: string;
  detail: string;
};

export default function ArticleCard(props: Props) {
  return (
    <Card variant="outlined" sx={{ padding: 2, borderRadius: 4 }}>
      <CardActionArea>
        <CardMedia component="img" src={props.imgContent} alt="green iguana" />
        <CardContent>
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            fontWeight="bold"
            sx={{ wordWrap: "break-word" }}
          >
            {props.title}
          </Typography>
          <ReadMoreText variant="body2">{props.detail}</ReadMoreText>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

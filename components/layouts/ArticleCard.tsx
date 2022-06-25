import { Box, Link, Typography } from "@mui/material";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useRouter } from "next/router";
import { Secondary } from "@/public/constants/color.constant";

type Props = {
  contentId: string;
  imgContent: string;
  altImg: string;
  title: string;
  detail: string;
};

export default function ArticleCard(props: Props) {
  const router = useRouter();
  return (
    <Card variant="outlined" sx={{ padding: 2, borderRadius: 4 }}>
      <CardMedia component="img" src={props.imgContent} alt={props.altImg} />
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
        {/* <ReadMoreText variant="body2">{props.detail}</ReadMoreText> */}

        <Typography sx={{ display: "inline", width: "100%" }}>
          {props.detail.slice(0, 120)}
          <Box component="span">
            <Link color={Secondary} href="/content/article">
              {"... อ่านเพิ่ม >>"}
            </Link>
          </Box>
        </Typography>
      </CardContent>
    </Card>
  );
}

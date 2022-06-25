import { Box, Link, Typography } from "@mui/material";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useRouter } from "next/router";
import { Secondary } from "@/public/constants/color.constant";
import { ArticleItem } from "@/models/content.model";

export default function ArticleCard(item: ArticleItem) {
  const router = useRouter();
  return (
    <Card variant="outlined" sx={{ padding: 2, borderRadius: 4 }}>
      <CardMedia component="img" src={item.pathImg} alt={item.altImg} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h3"
          component="div"
          fontWeight="bold"
          sx={{ wordWrap: "break-word" }}
        >
          {item.title}
        </Typography>
        {/* <ReadMoreText variant="body2">{props.detail}</ReadMoreText> */}

        <Typography sx={{ display: "inline", width: "100%" }}>
          {item.detail.slice(0, 120)}
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

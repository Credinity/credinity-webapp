import { Box, Paper } from "@mui/material";
import React from "react";
import ArticleCard from "@/components/displays/Carousel/ArticleCard";
import { ArticleItem } from "@/models/content.model";

type Props = {
  items: ArticleItem[];
};

export default function ArticleCardGroupView({ items }: Props) {
  return (
    <Paper sx={{ paddingBottom: 2 }} elevation={0}>
      {items.map((item, i) => (
        <Box key={i} sx={{ mt: 2 }}>
          <ArticleCard {...item} />
        </Box>
      ))}
    </Paper>
  );
}

import { Box, Typography } from "@mui/material";
import React, { useState } from "react";

export default function ReadMoreText(props: any) {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <Typography sx={{ display: "inline", width: "100%" }} {...props}>
      {isReadMore ? props.children.slice(0, 120) : props.children}
      <Box component="span" onClick={toggleReadMore}>
        {isReadMore ? "... อ่านเพิ่ม >>" : "<< show less"}
      </Box>
    </Typography>
  );
}

import React, { useState } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import { FeatureItem } from "@/models/content.model";

export default function ImageHover(item: FeatureItem) {
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  return (
    <Box onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {isHovering ? (
        <Image
          src={item.pathHoverImg}
          alt={item.altImg}
          width={90}
          height={90}
        />
      ) : (
        <Image src={item.pathImg} alt={item.altImg} width={90} height={90} />
      )}
    </Box>
  );
}

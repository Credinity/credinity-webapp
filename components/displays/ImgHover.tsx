import React, { useState } from "react";
import { Box } from "@mui/material";
import Image, { StaticImageData } from "next/image";

type Props = {
  imgNormal: StaticImageData;
  imgHover: StaticImageData;
  imgAlt: string;
};

export default function ImageHover({ imgNormal, imgHover, imgAlt }: Props) {
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  return (
    <Box onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {isHovering ? (
        <Image src={imgHover} alt={imgAlt} width={90} height={90} />
      ) : (
        <Image src={imgNormal} alt={imgAlt} width={90} height={90} />
      )}
    </Box>
  );
}

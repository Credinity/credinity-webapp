import React, { useState } from "react";
import Image from "next/image";
import { Box, Stack, Typography } from "@mui/material";
import BackButton from "@/components/inputs/BackButton";
import PageContainer from "@/components/layouts/PageContainer";
import CameraCover from "@/public/img/cameracover/profile-cover-camera.svg";
import PrimaryButton from "@/components/inputs/PrimaryButton";
import CheckIcon from "@mui/icons-material/Check";
import { useRouter } from "next/router";

export default function faceRecognition() {
  const [isPageLoading, setIsPageLoading]: [boolean, Function] =
    useState(false);
  const router = useRouter();
  return (
    <PageContainer
      pageName="Face Recognition"
      loading={isPageLoading}
      loadingMessage="Redirecting..."
    >
      <BackButton />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mx: "5vw" }}
      >
        <Typography fontWeight="bold" variant="h1" sx={{ my: "3vh" }}>
          ถ่ายใบหน้าของคุณ
        </Typography>
        <Image src={CameraCover} alt="Circle camera" height={301} width={300} />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="start"
          alignItems="start"
          width="100%"
        >
          <Typography
            sx={{ mt: "3vh" }}
            textAlign="start"
            fontWeight="bold"
            variant="h3"
          >
            ขั้นตอนการถ่ายรูปใบหน้า
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{ mt: 3, ml: 3 }}
          >
            <CheckIcon color="primary" />
            <Typography variant="body1">กรุณาถอดแแว่น</Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{ my: 1, ml: 3 }}
          >
            <CheckIcon color="primary" />
            <Typography variant="body1">แสกนใบหน้าในที่มีแสงสว่าง</Typography>
          </Stack>
        </Box>
        <PrimaryButton
          fullWidth
          sx={{ mx: 5, mt: "3vh" }}
          onClick={() => {
            setIsPageLoading(true);
            router.push("/ekyc/faceRecognition");
            setIsPageLoading(false);
          }}
        >
          เริ่มการเซลฟี่
        </PrimaryButton>
      </Box>
    </PageContainer>
  );
}

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { Box, Stack, Typography } from "@mui/material";
import BackButton from "@/components/inputs/BackButton";
import PageContainer from "@/components/layouts/PageContainer";
import CameraCover from "@/public/img/cameracover/profile-cover-camera.svg";
import PrimaryButton from "@/components/inputs/PrimaryButton";
import CheckIcon from "@mui/icons-material/Check";
import { PhotoCamera } from "@mui/icons-material";
import { useRouter } from "next/router";

const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: "user",
};

export default function faceRecognition() {
  const router = useRouter();
  const [isPageLoading, setIsPageLoading]: [boolean, Function] =
    useState(false);
  const [imgSrc, setImgSrc]: [string, Function] = useState("");
  const videoRef = useRef(null);
  const capture = React.useCallback(() => {
    if (videoRef) {
      const imageSrc = videoRef.current.getScreenshot();
      if (imageSrc) {
        setImgSrc(imageSrc);
      }
    }
  }, [imgSrc]);
  return (
    <PageContainer
      pageName="Intro Face Recognition"
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
        <Box position="relative" sx={{ mb: 5 }}>
          {imgSrc == "" ? (
            <Webcam
              audio={false}
              height={300}
              width={300}
              ref={videoRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          ) : (
            <Image src={imgSrc} alt="Selfie Photo" height={300} width={300} />
          )}
          <Box
            position="absolute"
            sx={{
              mx: "auto",
              left: 0,
              right: 0,
              top: 0,
              backgroundColor: "transparent",
            }}
          >
            <Image
              src={CameraCover}
              alt="Circle camera"
              height={301}
              width={300}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="start"
            alignItems="start"
          >
            <Typography
              sx={{ mt: 3 }}
              textAlign="start"
              fontWeight="bold"
              variant="h3"
            >
              ขั้นตอนการแสกนใบหน้า
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
        </Box>
        <Stack spacing={2} width="100%">
          {imgSrc != "" ? (
            <PrimaryButton
              onClick={() => {
                setImgSrc("");
              }}
            >
              <PhotoCamera />
              &nbsp; ถ่ายอีกครั้ง
            </PrimaryButton>
          ) : (
            <PrimaryButton
              onClick={() => {
                capture();
              }}
            >
              <PhotoCamera />
              &nbsp; ถ่ายรูป
            </PrimaryButton>
          )}

          <PrimaryButton
            sx={{ mx: 5 }}
            onClick={() => {
              setIsPageLoading(true);
              router.push("/ekyc/infoForm");
              setIsPageLoading(false);
            }}
          >
            บันทึก
          </PrimaryButton>
        </Stack>
      </Box>
    </PageContainer>
  );
}

import BackButton from "@/components/inputs/BackButton";
import PrimaryButton from "@/components/inputs/PrimaryButton";
import PageContainer from "@/components/layouts/PageContainer";
import CameraCover from "@/public/img/cameracover/profile-cover-camera.svg";
import {
  mediaSelector,
  setSelfieImgb64,
  uploadPortraitEkycImgAsync,
} from "@/store/slices/mediaSlice";
import { useAppDispatch } from "@/store/store";
import { PhotoCamera } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: "user",
};

export default function FaceRecognitionPage() {
  const dispatch = useAppDispatch();
  const media = useSelector(mediaSelector);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const videoRef = useRef<Webcam>(null);
  const capture = React.useCallback(() => {
    if (videoRef) {
      if (!videoRef.current) return;
      const imageSrc = videoRef.current.getScreenshot();
      if (imageSrc) {
        dispatch(setSelfieImgb64(imageSrc));
      }
    }
  }, [videoRef]);
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
        <Box position="relative" sx={{ mb: 5 }}>
          {media.selfieImgb64 == "" ? (
            <Webcam
              audio={false}
              height={300}
              width={300}
              ref={videoRef}
              screenshotFormat="image/png"
              videoConstraints={videoConstraints}
            />
          ) : (
            <Image
              src={media.selfieImgb64}
              alt="Selfie Photo"
              height={300}
              width={300}
            />
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
          {media.selfieImgb64 != "" ? (
            <PrimaryButton
              onClick={() => {
                dispatch(setSelfieImgb64(""));
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
            onClick={async () => {
              setIsPageLoading(true);
              dispatch(uploadPortraitEkycImgAsync(media.selfieImgb64)).finally(
                () => {
                  setIsPageLoading(false);
                }
              );
            }}
          >
            บันทึก
          </PrimaryButton>
        </Stack>
      </Box>
    </PageContainer>
  );
}

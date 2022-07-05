import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { Box, Grid, Stack, Typography } from "@mui/material";
import BackButton from "@/components/inputs/BackButton";
import PageContainer from "@/components/layouts/PageContainer";
import FrameCover from "@/public/img/cameracover/id-card-cover-camera.svg";
import PrimaryButton from "@/components/inputs/PrimaryButton";
import { PhotoCamera } from "@mui/icons-material";
import { useRouter } from "next/router";
import {
  mediaSelector,
  setKycIdImgB64,
  uploadKycIdImageAsync,
} from "@/store/slices/mediaSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/store";
import CustomizedDialogs from "@/components/dialogs/CustomizedDialogs";

const videoConstraints = {
  width: 280,
  height: 439,
  facingMode: "user",
};

export default function cardScanner() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const media = useSelector(mediaSelector);
  const [isPageLoading, setIsPageLoading]: [boolean, Function] =
    useState(false);
  const videoRef = useRef(null);
  const capture = React.useCallback(() => {
    if (videoRef) {
      const imageSrc = videoRef.current.getScreenshot();
      if (imageSrc) {
        dispatch(setKycIdImgB64(imageSrc));
      }
    }
  }, []);
  return (
    <PageContainer
      pageName="Card Capture"
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
        <Typography fontWeight="bold" variant="h1" sx={{ mt: "3vh" }}>
          ถ่ายรูปบัตรของคุณ
        </Typography>
        <Typography variant="body2" sx={{ mb: "3vh" }}>
          วางบัตรประชาชนในกรอบ
        </Typography>
        <Box position="relative" sx={{ mb: 5 }}>
          {media.kycIdImgB64 == "" ? (
            <Webcam
              audio={false}
              width={280}
              height={439}
              ref={videoRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          ) : (
            <Image
              src={media.kycIdImgB64}
              alt="ID Card Photo"
              width={280}
              height={439}
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
            <Image src={FrameCover} alt="Card Frame" width={280} height={439} />
          </Box>
        </Box>
        <Stack spacing={2} width="100%">
          {media && media.kycIdImgB64 != "" ? (
            <PrimaryButton
              onClick={() => {
                dispatch(setKycIdImgB64(""));
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
              await dispatch(uploadKycIdImageAsync(media.kycIdImgB64));
              setIsPageLoading(false);
            }}
          >
            บันทึก
          </PrimaryButton>
        </Stack>
      </Box>
      <Grid item xs={12} sx={{ mx: "5vw" }}>
        {media.error != "" ? (
          <CustomizedDialogs title="พบข้อผิดพลาด" message={media.error} />
        ) : null}
      </Grid>
    </PageContainer>
  );
}

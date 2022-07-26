import CustomizedDialogs from "@/components/feedbacks/CustomizedDialogs";
import BackButton from "@/components/inputs/BackButton";
import PrimaryButton from "@/components/inputs/PrimaryButton";
import PageContainer from "@/components/layouts/PageContainer";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import {
  mediaSelector,
  setKycIdImgB64,
  uploadIdKycImgAsync,
} from "@/store/slices/mediaSlice";
import { useAppDispatch } from "@/store/store";
import { PhotoCamera } from "@mui/icons-material";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Webcam from "react-webcam";

const width = 300;
const height = 300;
const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const videoConstraints = {
  width: { min: width, ideal: 800 },
  height: { min: height, ideal: 800 },
  aspectRatio: { ideal: 1 },
  facingMode: FACING_MODE_ENVIRONMENT,
};

const CardScannerPage = () => {
  const media = useSelector(mediaSelector);
  const dispatch = useAppDispatch();
  const videoRef = useRef<Webcam>(null);

  const [facingMode, setFacingMode] = React.useState(FACING_MODE_ENVIRONMENT);
  const [isPageLoading, setIsPageLoading] = useState(false);

  const capture = React.useCallback(() => {
    if (videoRef) {
      if (!videoRef.current) return;
      const imageSrc = videoRef.current.getScreenshot({
        width,
        height,
      });
      if (imageSrc) {
        dispatch(setKycIdImgB64(imageSrc));
      }
    }
  }, [videoRef, media.kycIdImgB64]);

  const switchCameraClick = React.useCallback(() => {
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER
    );
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
        <Typography fontWeight="bold" variant="h1" sx={{ mt: "1vh" }}>
          ถ่ายรูปบัตรของคุณ
        </Typography>
        <Typography variant="body2" sx={{ mb: "1vh" }}>
          วางบัตรประชาชนในกรอบ
        </Typography>
        <PrimaryButton sx={{ mb: "2vh" }}>
          <FlipCameraAndroidIcon />
          <Typography
            onClick={switchCameraClick}
            variant="body1"
            fontWeight="medium"
            sx={{ mr: 1 }}
          >
            &nbsp; สลับกล้อง
          </Typography>
        </PrimaryButton>
        <Box position="relative" sx={{ mb: 5 }}>
          {media.kycIdImgB64 == "" ? (
            <Webcam
              audio={false}
              ref={videoRef}
              forceScreenshotSourceSize={true}
              videoConstraints={{
                ...videoConstraints,
                facingMode,
              }}
              height={height}
              width={width}
              screenshotFormat="image/png"
            />
          ) : (
            <Image
              src={media.kycIdImgB64}
              alt="ID Card Photo"
              width={width}
              height={height}
            />
          )}
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
            disabled={media && media.kycIdImgB64 == ""}
            onClick={async () => {
              setIsPageLoading(true);
              dispatch(uploadIdKycImgAsync(media.kycIdImgB64)).finally(() => {
                setIsPageLoading(false);
              });
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
};

export default CardScannerPage;

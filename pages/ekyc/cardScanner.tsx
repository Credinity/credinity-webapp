import CustomizedDialogs from "@/components/feedbacks/CustomizedDialogs";
import BackButton from "@/components/inputs/BackButton";
import PrimaryButton from "@/components/inputs/PrimaryButton";
import PageContainer from "@/components/layouts/PageContainer";
import FrameCover from "@/public/img/cameracover/id-card-cover-camera.svg";
import {
  mediaSelector,
  setKycIdImgB64,
  uploadIdKycImgAsync,
} from "@/store/slices/mediaSlice";
import { useAppDispatch } from "@/store/store";
import { PhotoCamera } from "@mui/icons-material";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Webcam from "react-webcam";

const width = 280;
const height = 440;

const videoConstraints = {
  height: height,
  width: width,
  // facingMode: { exact: "environment" },
};

const CardScannerPage = () => {
  const media = useSelector(mediaSelector);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const dispatch = useAppDispatch();
  const videoRef = useRef<Webcam>(null);
  const capture = React.useCallback(() => {
    if (videoRef) {
      if (!videoRef.current) return;
      const imageSrc = videoRef.current.getScreenshot();
      if (imageSrc) {
        dispatch(setKycIdImgB64(imageSrc));
      }
    }
  }, [videoRef]);

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
              height={height}
              width={width}
              screenshotFormat="image/png"
              forceScreenshotSourceSize={true}
              ref={videoRef}
              videoConstraints={videoConstraints}
              style={{
                objectFit: "cover",
              }}
            />
          ) : (
            <Image
              src={media.kycIdImgB64}
              alt="ID Card Photo"
              width={width}
              height={height}
              style={{
                objectFit: "cover",
              }}
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
              src={FrameCover}
              alt="Card Frame"
              width={width}
              height={height}
            />
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

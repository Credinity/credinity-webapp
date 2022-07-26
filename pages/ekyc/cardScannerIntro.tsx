import BackButton from "@/components/inputs/BackButton";
import PrimaryButton from "@/components/inputs/PrimaryButton";
import PageContainer from "@/components/layouts/PageContainer";
import { Ladybug } from "@/models/constants/color.constant";
import CardImg from "@/public/img/person/id-card.png";
import { rearCameraChecking } from "@/store/slices/mediaSlice";
import { useAppDispatch } from "@/store/store";
import CheckIcon from "@mui/icons-material/Check";
import {
  Box,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function CardScannerIntroPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [cardType, setCardType] = React.useState<string | null>("ThaiCard");
  const [isAllowCamera, setIsAllowCamera] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);

  const handleCardType = (
    event: React.MouseEvent<HTMLElement>,
    newCardType: string | null
  ) => {
    setCardType(newCardType);
  };

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
        <Typography
          fontWeight="bold"
          textAlign="center"
          variant="h1"
          sx={{ mx: "5vw", mt: "3vh" }}
        >
          สแกนบัตรประชาชน
        </Typography>
        <ToggleButtonGroup
          value={cardType}
          exclusive
          onChange={handleCardType}
          sx={{ mt: "2vh" }}
        >
          <ToggleButton value="ThaiCard">
            <Typography textAlign="center" fontWeight="bold" variant="h3">
              ไทย
            </Typography>
          </ToggleButton>

          <ToggleButton value="ForeignCard" disabled>
            <Typography textAlign="center" fontWeight="bold" variant="h3">
              Foreigner
            </Typography>
          </ToggleButton>
        </ToggleButtonGroup>
        <Box sx={{ my: 2 }}>
          <Image priority src={CardImg} alt="ID Card" />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="start"
          alignItems="start"
          width="100%"
        >
          <Typography
            sx={{ mt: 3 }}
            textAlign="start"
            fontWeight="bold"
            variant="h3"
          >
            ขั้นตอนการแสกนบัตร
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{ mt: 3, ml: 3 }}
          >
            <CheckIcon color="primary" />
            <Typography variant="body1">ต้องสามารถเห็นได้ชัดเจน</Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{ my: 1, ml: 3 }}
          >
            <CheckIcon color="primary" />
            <Typography variant="body1">มีแสงสว่างเพียงพอ</Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{ my: 1, ml: 3 }}
          >
            <CheckIcon color="primary" />
            <Typography variant="body1">
              ไม่สามารถยืนยันตัวตนได้ถ้าไม่อนุญาติใช้กล้อง
            </Typography>
          </Stack>
        </Box>
        <Stack width="100%" sx={{ mt: "4vh" }}>
          {!isAllowCamera ? (
            <Grid
              item
              xs={12}
              justifyContent="center"
              alignItems="center"
              display="flex"
              sx={{ mb: 2 }}
            >
              <Typography variant="h4" color={Ladybug}>
                ไม่สามารถยืนยันตัวตนได้ถ้าไม่อนุญาติใช้กล้อง
              </Typography>
            </Grid>
          ) : null}
          <PrimaryButton
            onClick={() => {
              navigator.mediaDevices
                .getUserMedia({ audio: false, video: true })
                .then(
                  (stream) => {
                    // camera available
                    setIsPageLoading(true);
                    dispatch(rearCameraChecking(stream));
                    router.push("/ekyc/cardScanner").finally(() => {
                      setIsPageLoading(false);
                    });
                  },
                  (e) => {
                    // camera not available
                    setIsAllowCamera(false);
                  }
                );
            }}
          >
            สแกนบัตร
          </PrimaryButton>
        </Stack>
      </Box>
    </PageContainer>
  );
}

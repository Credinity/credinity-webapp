import BackButton from "@/components/inputs/BackButton";
import PageContainer from "@/components/layouts/PageContainer";
import { Box, Grid, Link, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PrimaryButton from "@/components/inputs/PrimaryButton";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faAddressCard,
  faImage,
  faSquarePen,
} from "@fortawesome/free-solid-svg-icons";
import { Gray } from "@/models/constants/color.constant";
import CustomizedDialogs from "@/components/dialogs/CustomizedDialogs";
import { useSelector } from "react-redux";
import { getPrivacyPolicyAsync, userSelector } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";
import { setIsOpenPrivacyConterm } from "@/store/slices/pageSlice";

export default function ekycStepIntroPage() {
  const [isPageLoading, setisPageLoading]: [boolean, Function] =
    useState(false);
  const router = useRouter();
  const user = useSelector(userSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPrivacyPolicyAsync());
  }, []);
  return (
    <PageContainer
      pageName="Ekyc intro"
      loading={isPageLoading}
      loadingMessage="Redirecting..."
    >
      <BackButton />

      <Typography
        fontWeight="bold"
        textAlign="center"
        variant="h1"
        sx={{ mx: "5vw", my: "3vh" }}
      >
        ยืนยันตัวตนง่ายๆใน 4 ขั้นตอน
      </Typography>

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={8}
        sx={{ mx: "5vw", my: "5vh" }}
      >
        <Grid container>
          <Grid
            item
            xs={3}
            sm={5}
            container
            justifyContent="center"
            alignItems="center"
          >
            <FontAwesomeIcon icon={faUser} size="2x" color={Gray} />
          </Grid>
          <Grid item xs={9} sm={7}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography variant="body1">
                &#x2022; &nbsp; เตรียมบัตรประชาชนตัวจริง{<br />}
                &#x2022; &nbsp; โทรศัพท์มือถือที่มีกล้องหน้า
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            xs={3}
            sm={5}
            container
            justifyContent="center"
            alignItems="center"
          >
            <FontAwesomeIcon icon={faAddressCard} size="2x" color={Gray} />
          </Grid>
          <Grid item xs={9} sm={7}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography variant="body1">ถ่ายรูปบัตรประชาชน</Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            xs={3}
            sm={5}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <FontAwesomeIcon icon={faImage} size="2x" color={Gray} />
            </Box>
          </Grid>
          <Grid item xs={9} sm={7}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography variant="body1">สแกนใบหน้าของคุณ</Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            xs={3}
            sm={5}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <FontAwesomeIcon icon={faSquarePen} size="2x" color={Gray} />
            </Box>
          </Grid>
          <Grid item xs={9} sm={7}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography variant="body1">
                กรอกข้อมูลให้ครบถ้วย{<br />}กดตกลงและรอระบบตรวจสอบ
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Typography display="inline" variant="body2" sx={{ mb: 3 }}>
            หากกดปุ่มด้านล่างจะถือเป็นการยอมรับข้อกำหนดและเงื่อนไข&nbsp;กรุณาอ่าน&nbsp;
            <Link
              display="inline"
              href=""
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                dispatch(setIsOpenPrivacyConterm(true));
              }}
            >
              รายละเอียดที่นี้
            </Link>
            &nbsp;ก่อนเริ่มทำรายการ
          </Typography>
          <PrimaryButton
            fullWidth
            onClick={() => {
              setisPageLoading(true);
              router.push("/ekyc/cardScannerIntro");
            }}
          >
            ยอมรับและเริ่มยืนยันตัวตน
          </PrimaryButton>
        </Grid>
      </Stack>
      <Grid item xs={12} sx={{ mx: "5vw" }}>
        {user.privacyVersion != "" ? (
          <CustomizedDialogs
            title="นโยบายรักษาข้อมูลส่วนบุคคล"
            htmlDetail={user.privacyDetailHtml}
          />
        ) : null}
      </Grid>
    </PageContainer>
  );
}

import CustomizedDialogs from "@/components/feedbacks/CustomizedDialogs";
import BackButton from "@/components/inputs/BackButton";
import PrimaryButton from "@/components/inputs/PrimaryButton";
import PageContainer from "@/components/layouts/PageContainer";
import { Gray } from "@/models/constants/color.constant";
import { setIsOpenDialog } from "@/store/slices/pageSlice";
import { getPrivacyPolicyAsync, userSelector } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";
import {
  faAddressCard,
  faImage,
  faSquarePen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid, Link, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function EkycStepIntroPage() {
  const router = useRouter();
  const user = useSelector(userSelector);
  const dispatch = useAppDispatch();
  const [isPageLoading, setisPageLoading] = useState(false);

  const fetchPrivacyPolicy = useCallback(() => {
    dispatch(getPrivacyPolicyAsync());
  }, []);
  useEffect(() => {
    fetchPrivacyPolicy();
  }, [fetchPrivacyPolicy]);
  return (
    <PageContainer
      pageName="E-KYC intro"
      loading={isPageLoading}
      loadingMessage="Redirecting..."
    >
      <BackButton />

      <Typography
        fontWeight="bold"
        textAlign="center"
        variant="h1"
        sx={{ mx: "5vw", my: "1vh" }}
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
                if (user.privacyVersion != "") {
                  dispatch(setIsOpenDialog(true));
                }
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
              router.push("/ekyc/cardScannerIntro").finally(() => {
                setisPageLoading(false);
              });
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

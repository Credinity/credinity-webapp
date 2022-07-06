import PageContainer from "@/components/layouts/PageContainer";
import { Gainsboro, Primary } from "@/models/constants/color.constant";
import { UserID } from "@/models/constants/key.constant";
import { getProfileAsync, userSelector } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import Logo from "@/public/img/logo/credinity-tr-txt.png";
import Image from "next/image";
import {
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {};

export default function EkycStatusPage({}: Props) {
  const cookies = new Cookies();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useSelector(userSelector);

  const [isPageLoading, setIsPageLoading]: [boolean, Function] =
    useState(false);
  useEffect(() => {
    let id = cookies.get(UserID);
    if (id != "") {
      dispatch(getProfileAsync({ userId: id }));
    }
  }, []);
  return (
    <PageContainer
      pageName="Status"
      loading={isPageLoading}
      loadingMessage="Redirecting..."
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ mx: "5vw", backgroundColor: Gainsboro }}
      >
        <Grid item xs={12}>
          <Image src={Logo} alt="Credinity logo" />
        </Grid>
        <Paper elevation={5} sx={{ borderRadius: 20 }}>
          {user && user.ekycStatus == 1 ? (
            <Stack justifyContent="center" alignItems="center" spacing={3}>
              <FontAwesomeIcon
                icon={faCircleCheck}
                inverse
                size="2x"
                color={Primary}
              />
              <Typography
                variant="h1"
                fontWeight="bold"
                sx={{ wordWrap: "break-word" }}
              >
                ยืนยันบัญชีผู้ใช้แล้ว
              </Typography>
              <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
                คุณสร้างบัญชี Credinity สำเร็จแล้ว {<br />}
                กรุณาเก็บข้อมูลของท่านเพื่อใช้ในการใช้เว็บไซต์ต่อไป
              </Typography>
            </Stack>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <FontAwesomeIcon
                icon={faCircleExclamation}
                inverse
                size="2x"
                color={Primary}
              />
              <Typography
                variant="h1"
                fontWeight="bold"
                sx={{ wordWrap: "break-word" }}
              >
                ดำเนินการไม่สำเร็จ
              </Typography>
              <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
                ไม่พบข้อมูลกรุณาลองใหม่อีกครั้ง {<br />}
                หากท่านเป็นผู้ลงทะเบียนใหม่โปรดตรวจสอบสถานะของท่านอีกครั้งภายหลัง
              </Typography>
            </Box>
          )}
        </Paper>
      </Grid>
    </PageContainer>
  );
}

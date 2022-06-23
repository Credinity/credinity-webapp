import CredinityFullFooter from "@/components/layouts/CredinityFullFooter";
import AppBarHeader from "@/components/layouts/AppBarHeader";
import PageContainer from "@/components/layouts/PageContainer";
import { setRequestSuccess, userSelector } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";
import {
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import MainPageImg from "../public/img/contents/mainpageImg.png";
import PrimaryButton from "@/components/inputs/PrimaryButton";
export default function Index() {
  const user = useSelector(userSelector);
  const [isReadMore, setIsReadMore]: [boolean, Function] = useState(false);
  const [isSignIn, setSignIn]: [boolean, Function] = useState(false);
  const [isSignUp, setSignUp]: [boolean, Function] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const routePage = (path: string) => {
    dispatch(setRequestSuccess(true));
    router.push(path);
    dispatch(setRequestSuccess(false));
  };
  const moreCards = () => {
    return (
      <>
        {/* todo: change to list map cards from services */}
        <Grid item container sx={{ paddingY: 1 }}>
          {/* <Image
        src=""
        alt=""
        width={1900}
        height={1600}
      /> */}

          <Paper
            elevation={3}
            sx={{
              minWidth: "100%",
              minHeight: "55vh",
              backgroundColor: "aqua",
            }}
          />
        </Grid>
        <Grid item container>
          {/* <Image
         src=""
         alt=""
         width={1900}
         height={1600}
       /> */}

          <Paper
            elevation={3}
            sx={{
              minWidth: "100%",
              minHeight: "55vh",
              backgroundColor: "pink",
            }}
          />
        </Grid>
      </>
    );
  };
  const menuArray = [
    { name: "LOG IN", path: "/auth/signIn" },
    { name: "REGISTER", path: "/auth/signUp" },
    { name: "INVESTOR", path: "" },
    { name: "LOAN", path: "" },
    { name: "NEWS", path: "" },
    { name: "ABOUT US", path: "" },
    { name: "PROFILE", path: "" },
  ];
  return (
    <PageContainer
      pageName="Index"
      loading={user.isRequestSuccess}
      loadingMessage="Redirecting..."
    >
      <AppBarHeader menuList={menuArray} />
      <Stack
        direction="column"
        justifyContent="center"
        spacing={1}
        sx={{ px: "20px" }}
      >
        <Typography variant="h3" textAlign="center">
          Credinity, a P2P lending and investment service platform
        </Typography>
        <Image
          priority
          src={MainPageImg}
          alt="Main Photo"
          layout="responsive"
          width={800}
          height={1000}
        />
        <Typography variant="caption" textAlign="start">
          เราเป็นตัวกลางในการทำให้
          ผู้ขอสินเชื่อและผู้ให้สินเชื่อมาพบกันโดยที่มีสินทรัพย์ค้ำประกัน
          โดยเราจะเป็นผู้จัดการเอกสาร
          รวมถึงรองรับความเสี่ยงของสินเชื่อให้กับผู้ให้สินเชื่อ
          สนใจร่วมเป็นส่วนหนึ่งของเรา
        </Typography>
        <Grid item container sx={{ paddingY: 1 }}>
          {isSignUp ? (
            <Stack alignItems="center">
              <CircularProgress />
            </Stack>
          ) : (
            <PrimaryButton
              disabled={isSignUp}
              onClick={() => {
                setSignUp(true);
                routePage("/auth/signUp");
                setSignUp(false);
              }}
            >
              สมัครสมาชิกที่นี่
            </PrimaryButton>
          )}
        </Grid>
        <CredinityFullFooter />
      </Stack>
    </PageContainer>
  );
}

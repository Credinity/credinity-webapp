import CredinityFullFooter from "@/components/layouts/CredinityFullFooter";
import AppBarHeader from "@/components/layouts/AppBarHeader";
import PageContainer from "@/components/layouts/PageContainer";
import { setRequestSuccess, userSelector } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import ImgDetailCard from "@/components/layouts/ImgDetailCard";
import { Black } from "@/public/constants/color.constant";
import PrimaryButton from "@/components/inputs/PrimaryButton";
import MainPageImg from "../public/img/contents/mainpageImg.png";
import Auction from "../public/img/features/Auction.png";
import AuctionHover from "../public/img/features/AuctionHover.png";
import Auto from "../public/img/features/Auto.png";
import AutoHover from "../public/img/features/AutoHover.png";
import Anyone from "../public/img/features/Anyone.png";
import AnyoneHover from "../public/img/features/AnyoneHover.png";

export default function Index() {
  const user = useSelector(userSelector);
  const [isSignUp, setSignUp]: [boolean, Function] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const routePage = (path: string) => {
    dispatch(setRequestSuccess(true));
    router.push(path);
    dispatch(setRequestSuccess(false));
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
        <Box sx={{ mb: 2 }}>
          <Typography variant="h1" fontWeight="bold" textAlign="center">
            Credinity, a P2P lending and investment service platform
          </Typography>
          <Box sx={{ my: 2 }}>
            <Image priority src={MainPageImg} alt="Main Photo" />
          </Box>

          <Typography variant="body1" textAlign="start">
            เราเป็นตัวกลางในการทำให้
            ผู้ขอสินเชื่อและผู้ให้สินเชื่อมาพบกันโดยที่มีสินทรัพย์ค้ำประกัน
            โดยเราจะเป็นผู้จัดการเอกสาร
            รวมถึงรองรับความเสี่ยงของสินเชื่อให้กับผู้ให้สินเชื่อ
            สนใจร่วมเป็นส่วนหนึ่งของเรา
          </Typography>
        </Box>
        <Grid item container>
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
        <Box minHeight="15px" />
        <Typography variant="h2">การบริการของเรา</Typography>
        <Divider sx={{ backgroundColor: Black, my: 2 }} />
        <Box minHeight="15px" />
        <ImgDetailCard
          imgAlt="auction"
          imgNormal={Auction}
          imgHover={AuctionHover}
          title="Auction"
          detail="บริการประมูลทรัพย์สิน สมาชิกมีสิทธิในการประมูลอสังหาริมทรัพย์โดยเสนอจำนวนเงิน ดอกเบี้ย และค่าธรรมเนียมปากถุง"
        />
        <Box minHeight="15px" />
        <ImgDetailCard
          imgAlt="auto exchange"
          imgNormal={Auto}
          imgHover={AutoHover}
          title="Auto"
          detail="บริการอัติโนมัติ สมาชิกสามารถโอนเงินเข้าลงทุนที่บริษัท โดยทางบริษัท Credinity จะทำการขอสินเชื่อกับสมาชิกที่ต้องการปล่อนสินเชื่อ และจะทำการนำเงินไปปล่อยสินเชื่อต่อให้สมาชิก โดยสมาชิกจะได้รับดอกเบี้ย อัติโนมัติ โดยทาง Credinity จะเป็นผู้รับความเสี่ยงให้สมาชิก ในกรณีทรัพย์สินถูกยึด"
        />
        <Box minHeight="15px" />
        <ImgDetailCard
          imgAlt="Asset Allocation and Diversification"
          imgNormal={Anyone}
          imgHover={AnyoneHover}
          title="Anyone"
          detail="บริการกระจายความเสี่ยงการปล่อยสินเชื่อ ทางผู้ปล่อยสินเชื่อ กรณีที่มีเงินไม่เพียงพอในการปล่อยสินเชื่อขนาดใหญ่ แต่ต้องการเลือกทรัพย์สินในการค้ำประกันเอง สามารถเลือกสินทรัพย์ที่บริษัทประกาศได้ว่าสินทรัพย์นี้ สามารถร่วมกระจายความเสี่ยงได้ ซึ่งสัญญาจะถูกทำในนามบริษัท เมื่อจำนวนเงินครบตามจำนวน และหากทรัพย์สินถูกยึดจะได้รับเงินคืนเมื่อขายได้เท่านั้น"
        />
        <Box minHeight="15px" />
        <Typography variant="h2">บทความ</Typography>
        <Divider sx={{ backgroundColor: Black, my: 2 }} />
      </Stack>
      <CredinityFullFooter />
    </PageContainer>
  );
}

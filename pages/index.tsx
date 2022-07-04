import CredinityFullFooter from "@/components/layouts/CredinityFullFooter";
import AppBarHeader from "@/components/layouts/AppBarHeader";
import PageContainer from "@/components/layouts/PageContainer";
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
import type { GetServerSideProps } from "next";
import jsonwebtoken from "jsonwebtoken";
import Image from "next/image";
import ImgDetailCard from "@/components/layouts/ImgDetailCard";
import { Black } from "@/public/constants/color.constant";
import PrimaryButton from "@/components/inputs/PrimaryButton";
import MainPageImg from "@/public/img/contents/mainpageImg.png";
import Auction from "@/public/img/features/Auction.png";
import AuctionHover from "@/public/img/features/AuctionHover.png";
import Auto from "@/public/img/features/Auto.png";
import AutoHover from "@/public/img/features/AutoHover.png";
import Anyone from "@/public/img/features/Anyone.png";
import AnyoneHover from "@/public/img/features/AnyoneHover.png";
import { FeatureItem } from "@/models/content.model";
import ArticleCarouselView from "@/components/displays/Carousel/ArticleCarouselView";
import { useSelector } from "react-redux";
import {
  pageSelector,
  setIsContainTokenCookie,
} from "@/store/slices/pageSlice";

type Props = {
  initialCheckToken: boolean;
};

export default function Index({ initialCheckToken }: Props) {
  const dispatch = useAppDispatch();
  const page = useSelector(pageSelector);

  const [isPageLoading, setisPageLoading]: [boolean, Function] =
    useState(false);

  const router = useRouter();
  const routePage = (path: string) => {
    setisPageLoading(true);
    router.push(path);
    setisPageLoading(false);
  };

  React.useEffect(() => {
    dispatch(setIsContainTokenCookie(initialCheckToken));
  }, []);

  const featureArray: FeatureItem[] = [
    {
      contentId: 1,
      pathHoverImg: AuctionHover,
      pathImg: Auction,
      altImg: "auction",
      title: "Auction",
      detail:
        "บริการประมูลทรัพย์สิน สมาชิกมีสิทธิในการประมูลอสังหาริมทรัพย์โดยเสนอจำนวนเงิน ดอกเบี้ย และค่าธรรมเนียมปากถุง",
    },
    {
      contentId: 2,
      pathHoverImg: AutoHover,
      pathImg: Auto,
      altImg: "auto exchange",
      title: "Auto",
      detail:
        "บริการอัติโนมัติ สมาชิกสามารถโอนเงินเข้าลงทุนที่บริษัท โดยทางบริษัท Credinity จะทำการขอสินเชื่อกับสมาชิกที่ต้องการปล่อนสินเชื่อ และจะทำการนำเงินไปปล่อยสินเชื่อต่อให้สมาชิก โดยสมาชิกจะได้รับดอกเบี้ย อัติโนมัติ โดยทาง Credinity จะเป็นผู้รับความเสี่ยงให้สมาชิก ในกรณีทรัพย์สินถูกยึด",
    },
    {
      contentId: 3,
      pathHoverImg: AnyoneHover,
      pathImg: Anyone,
      altImg: "Asset Allocation and Diversification",
      title: "Anyone",
      detail:
        "บริการกระจายความเสี่ยงการปล่อยสินเชื่อ ทางผู้ปล่อยสินเชื่อ กรณีที่มีเงินไม่เพียงพอในการปล่อยสินเชื่อขนาดใหญ่ แต่ต้องการเลือกทรัพย์สินในการค้ำประกันเอง สามารถเลือกสินทรัพย์ที่บริษัทประกาศได้ว่าสินทรัพย์นี้ สามารถร่วมกระจายความเสี่ยงได้ ซึ่งสัญญาจะถูกทำในนามบริษัท เมื่อจำนวนเงินครบตามจำนวน และหากทรัพย์สินถูกยึดจะได้รับเงินคืนเมื่อขายได้เท่านั้น",
    },
  ];

  return (
    <PageContainer
      pageName="Index"
      loading={isPageLoading}
      loadingMessage="Redirecting..."
    >
      <AppBarHeader />
      <Stack
        direction="column"
        justifyContent="center"
        spacing={1}
        sx={{ mx: "5vw" }}
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
        {page.isContainTokenCookie ? null : (
          <Grid item container>
            {isPageLoading ? (
              <Stack alignItems="center">
                <CircularProgress />
              </Stack>
            ) : (
              // todo: แสดงปุ่มเมื่อผ่านการ login และยังไม่ ekyc
              <PrimaryButton
                fullWidth
                disabled={isPageLoading}
                onClick={() => {
                  routePage("/ekyc/stepIntro");
                }}
              >
                ยืนยันตัวตน
              </PrimaryButton>
            )}
          </Grid>
        )}
        <Box minHeight="15px" />
        <Typography variant="h2">การบริการของเรา</Typography>
        <Divider sx={{ backgroundColor: Black, my: 2 }} />
        <Box minHeight="15px" />
        {featureArray.map((item, index) => (
          <Box key={index}>
            <ImgDetailCard {...item} />
            <Box minHeight="15px" />
          </Box>
        ))}
        <Typography variant="h2">บทความ</Typography>
        <Divider sx={{ backgroundColor: Black, my: 2 }} />
        <ArticleCarouselView />
        <Box minHeight="15px" />
      </Stack>
      <CredinityFullFooter />
    </PageContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  var jwt = jsonwebtoken.decode(req.cookies.authorization);
  if (jwt) {
    return {
      props: {
        initialCheckToken: [true],
      },
    };
  } else {
    return {
      props: {
        initialCheckToken: [false],
      },
    };
  }
};

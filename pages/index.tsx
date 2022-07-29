import PrimaryButton from "@/components/inputs/PrimaryButton";
import AppBarHeader from "@/components/layouts/AppBarHeader";
import CredinityFullFooter from "@/components/layouts/CredinityFullFooter";
import ImgDetailCard from "@/components/layouts/ImgDetailCard";
import PageContainer from "@/components/layouts/PageContainer";
import { Black } from "@/models/constants/color.constant";
import MainPageImg from "@/public/img/contents/mainpageImg.png";
import { useAppDispatch } from "@/store/store";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import jsonwebtoken from "jsonwebtoken";
import type { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

import ArticleCarouselView from "@/components/displays/Carousel/ArticleCarouselView";
import { UserID } from "@/models/constants/key.constant";
import {
  pageSelector,
  setIsContainTokenCookie,
} from "@/store/slices/pageSlice";
import { getProfileAsync, userSelector } from "@/store/slices/userSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { featureArray } from "@/models/constants/content.constant";

type Props = {
  initialCheckToken: boolean;
};

export default function Index({ initialCheckToken }: Props) {
  const dispatch = useAppDispatch();
  const page = useSelector(pageSelector);
  const user = useSelector(userSelector);
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    dispatch(setIsContainTokenCookie(initialCheckToken));
    if (initialCheckToken == true) {
      const cookies = new Cookies();
      let id = cookies.get(UserID);
      if (id != "") {
        dispatch(getProfileAsync({ userId: id }));
      }
    }
  }, [initialCheckToken]);

  const router = useRouter();
  const routePage = (path: string) => {
    setIsPageLoading(true);
    router.push(path).finally(() => {
      setIsPageLoading(false);
    });
  };

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
        {page && page.isContainTokenCookie ? (
          <Grid item container>
            {user.ekycStatus == 0 ? (
              <PrimaryButton
                fullWidth
                disabled={isPageLoading}
                onClick={(e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  routePage("/ekyc/ekycStepIntro");
                }}
              >
                ยืนยันตัวตน
              </PrimaryButton>
            ) : null}
          </Grid>
        ) : (
          <PrimaryButton
            fullWidth
            onClick={() => {
              routePage("/auth/signUp");
            }}
          >
            สมัครสมาชิกที่นี่
          </PrimaryButton>
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
        initialCheckToken: true,
      },
    };
  } else {
    return {
      props: {
        initialCheckToken: false,
      },
    };
  }
};

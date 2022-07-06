import PageContainer from "@/components/layouts/PageContainer";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import jsonwebtoken from "jsonwebtoken";
import AppBarHeader from "@/components/layouts/AppBarHeader";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/store";
import {
  pageSelector,
  setIsContainTokenCookie,
} from "@/store/slices/pageSlice";
import { Gainsboro, Primary } from "@/models/constants/color.constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass } from "@fortawesome/free-solid-svg-icons";
import { Box, Typography } from "@mui/material";
import PrimaryButton from "@/components/inputs/PrimaryButton";

type Props = {
  title: string;
  detail: string;
  nextPagePath: string;
  isShowAppBar: true;
  backPagePath?: string;
  initialCheckToken: boolean;
};

export default function waiting(props: Props) {
  const [isPageLoading, setIsPageLoading]: [boolean, Function] =
    useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const page = useSelector(pageSelector);
  React.useEffect(() => {
    dispatch(setIsContainTokenCookie(props.initialCheckToken));
  }, []);
  return (
    <PageContainer
      pageName="Waiting Status"
      loading={isPageLoading}
      loadingMessage="Redirecting..."
    >
      {props.isShowAppBar ? null : <AppBarHeader isShowBackButton={true} />}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mx: "5vw" }}
      >
        <Typography
          fontWeight="bold"
          variant="h1"
          sx={{ my: "3vh", wordWrap: "break-word" }}
        >
          {page.titlePage}
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={300}
          height={300}
          style={{
            borderRadius: "50%",
            backgroundColor: Gainsboro,
          }}
        >
          <FontAwesomeIcon
            icon={faHourglass}
            style={{ width: 100, height: 100 }}
            color={Primary}
          />
        </Box>
        <Typography
          fontWeight="bold"
          variant="h3"
          textAlign="center"
          sx={{ my: "4vh", wordWrap: "break-word" }}
        >
          {page.detailPage}
        </Typography>
        <PrimaryButton
          fullWidth
          sx={{ mb: 5 }}
          onClick={() => {
            setIsPageLoading(true);
            router.push("/");
            setIsPageLoading(false);
          }}
        >
          ตกลง
        </PrimaryButton>
      </Box>
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

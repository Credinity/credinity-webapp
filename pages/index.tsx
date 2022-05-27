import AppBarHeader from "@/components/layout/AppBarHeader";
import PageContainer from "@/components/layout/pageContainer";
import { userSelector } from "@/store/slices/userSlice";
import { Grid } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

export default function Index({}: Props) {
  const user = useSelector(userSelector);
  return (
    <PageContainer
      pageName="Index"
      loading={user.isRequestSuccess}
      loadingMessage="Redirecting..."
    >
      <AppBarHeader />
    </PageContainer>
  );
}

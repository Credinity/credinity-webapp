import PageContainer from "@/components/layout/pageContainer";
import {
    userSelector,
    resetUsername,
    signUpAsync,
} from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";
import { Grid, Typography } from "@mui/material";
import { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";

const ProfilePage: NextPage = (props: any) => {
    return (
        <PageContainer>
            <Grid container>
                <Grid item xs={12}>
                    <Typography>Welcome</Typography>
                </Grid>
            </Grid>
        </PageContainer>
    );
};
export default ProfilePage;

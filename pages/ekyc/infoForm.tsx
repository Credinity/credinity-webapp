import BackButton from "@/components/inputs/BackButton";
import PageContainer from "@/components/layouts/PageContainer";
import { EkycFormProps } from "@/models/ekyc.model";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Formik, Form, FormikProps } from "formik";
import PrimaryButton from "@/components/inputs/PrimaryButton";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/store";
import {
  pageSelector,
  setDetailPage,
  setTitlePage,
} from "@/store/slices/pageSlice";

const initialValues: EkycFormProps = {
  displayName: "",
  fullName: "",
  idNo: "",
  laserId: "",
  docAddress: "",
  birthDate: Date.now(),
  phoneNumber: "",
  ethnicitySt: "",
  nationalitySt: "",
  lineId: "",
  facebook: "",
  referralCode: "",
};

const CustomizedField = (props: any) => {
  return (
    <TextField
      {...props}
      variant="standard"
      InputProps={{ style: { fontSize: 18 } }}
      InputLabelProps={{ style: { fontSize: 18 } }}
    />
  );
};

const ekycForm = ({
  values,
  setFieldValue,
  isValid,
  dirty,
  handleSubmit,
  handleChange,
}: FormikProps<EkycFormProps>) => {
  return (
    <Form onSubmit={handleSubmit}>
      <CustomizedField
        id="DisplayName"
        label="ตั้งชื่อ Username"
        name="displayName"
        value={values.displayName}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <CustomizedField
        id="FullName"
        label="ชื่อ-สกุล"
        name="fullName"
        value={values.fullName}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <CustomizedField
        id="IdNo"
        label="หมายเลขบัตรประชาชน/ พาสปอร์ต"
        name="idNo"
        value={values.idNo}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <CustomizedField
        id="LaserId"
        label="หมายเลขหลังบัตรประชาชน"
        name="laserId"
        value={values.laserId}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <CustomizedField
        id="DocAddress"
        label="ที่อยู่ปัจจุบันในการจัดส่งเอกสาร"
        name="docAddress"
        value={values.docAddress}
        onChange={handleChange}
        fullWidth
        required
        multiline
        sx={{ mb: 2 }}
      />
      <Grid item xs={5.5} sx={{ mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <MobileDatePicker
            label="วัน/ เดือน/ ปี เกิด"
            value={values.birthDate}
            onChange={(value) => setFieldValue("birthDate", value, true)}
            inputFormat="DD/MM/yyyy"
            renderInput={(params) => (
              <CustomizedField
                id="BirthDate"
                name="birthDate"
                required
                {...params}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ mb: 2 }}>
          <CustomizedField
            id="Ethnicity"
            name="ethnicitySt"
            label="เชื้อชาติ"
            value={values.ethnicitySt}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6} sx={{ mb: 2 }}>
          <CustomizedField
            id="Nationality"
            label="สัญชาติ"
            name="nationalitySt"
            value={values.nationalitySt}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
      </Grid>
      <CustomizedField
        id="LineId"
        label="Line ID"
        name="lineId"
        value={values.lineId}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <CustomizedField
        id="Facebook"
        label="Facebook"
        name="facebook"
        value={values.facebook}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <CustomizedField
        id="ReferralCode"
        label="User ผู้แนะนำ"
        name="referralCode"
        value={values.referralCode}
        onChange={handleChange}
        fullWidth
      />
      <PrimaryButton
        fullWidth
        sx={{ my: 5 }}
        onClick={() => {
          handleSubmit();
        }}
      >
        บันทึก
      </PrimaryButton>
    </Form>
  );
};

export default function infoForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const page = useSelector(pageSelector);
  const [isPageLoading, setIsPageLoading]: [boolean, Function] =
    useState(false);

  return (
    <PageContainer
      pageName="E-KYC Form"
      loading={isPageLoading}
      loadingMessage="Redirecting..."
    >
      <BackButton />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mx: "5vw" }}
      >
        <Typography fontWeight="bold" variant="h1" sx={{ my: "3vh" }}>
          โปรดกรอกข้อมูลให้ครบถ้วน
        </Typography>

        <Formik
          initialValues={initialValues!}
          onSubmit={async (values) => {
            //todo : call services
            setIsPageLoading(true);
            dispatch(setTitlePage("ระบบกำลังตรวจสอบข้อมูล"));
            dispatch(
              setDetailPage(
                "คุณจะได้รับการแจ้งเตือนผ่านอีเมลหลังจากระบบตรวจสอบข้อมูลสำเร็จ"
              )
            );
            router.push("/status/waiting");
            setIsPageLoading(false);
          }}
        >
          {(ekycFormProps) => ekycForm(ekycFormProps)}
        </Formik>
      </Box>
    </PageContainer>
  );
}

import BackButton from "@/components/inputs/BackButton";
import PageContainer from "@/components/layouts/PageContainer";
import { EkycFormReq } from "@/models/user.model";
import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
import { submitKycFormAsync, userSelector } from "@/store/slices/userSlice";
import { LovItem } from "@/models/content.model";
import { GetLovByType } from "@/services/commonService";
import { useSnackbar } from "notistack";
import { citizenFormat, phoneNumberFormat } from "helpers/client/stringFormat";

const initialValues: EkycFormReq = {
  username: "",
  fullName: "",
  idType: 0,
  idNo: "",
  laserId: "",
  address: "",
  phoneNumber: "",
  ethnicity: 0,
  nationality: 0,
  lineId: "",
  facebook: "",
  referralCode: "",
};

const CustomizedField = (props: any) => {
  return <TextField {...props} fullWidth variant="standard" />;
};

const ekycForm = (
  {
    values,
    setFieldValue,
    isValid,
    dirty,
    handleSubmit,
    handleChange,
  }: FormikProps<EkycFormReq>,
  options: Array<LovItem>
) => {
  const defaultOptionsProps = {
    options: options,
    getOptionLabel: (option: LovItem) => option.nameTh,
  };
  return (
    <Form onSubmit={handleSubmit}>
      <CustomizedField
        id="Username"
        label="ชื่อสาธารณะ"
        name="username"
        value={values.username}
        onChange={handleChange}
        required
        sx={{ mb: 2 }}
      />
      <CustomizedField
        id="FullName"
        label="ชื่อ-สกุล"
        name="fullName"
        value={values.fullName}
        onChange={handleChange}
        required
        sx={{ mb: 2 }}
      />
      <CustomizedField
        id="IdNo"
        label="หมายเลขบัตรประชาชน"
        name="idNo"
        value={values.idNo}
        onChange={(event: any) => {
          const { value } = event.target;
          let cid = citizenFormat(value);
          if (cid) {
            setFieldValue("idNo", cid, true);
          } else {
            setFieldValue("idNo", value, true);
          }
        }}
        required
        sx={{ mb: 2 }}
      />
      <CustomizedField
        id="LaserId"
        label="หมายเลขหลังบัตรประชาชน"
        name="laserId"
        value={values.laserId}
        onChange={handleChange}
        required
        sx={{ mb: 2 }}
      />
      <CustomizedField
        id="Address"
        label="ที่อยู่ปัจจุบันในการจัดส่งเอกสาร"
        name="address"
        value={values.address}
        onChange={handleChange}
        required
        multiline
        sx={{ mb: 2 }}
      />
      <CustomizedField
        id="PhoneNo"
        label="เบอร์โทรศัพท์"
        name="phoneNumber"
        value={values.phoneNumber}
        onChange={(event: any) => {
          const { value } = event.target;
          let phone = phoneNumberFormat(value);
          setFieldValue("phoneNumber", phone, true);
        }}
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
          <Autocomplete
            id="Ethnicity"
            {...defaultOptionsProps}
            renderOption={(props, option, index) => {
              const key = `${index}-${option.lovId}`;
              return (
                <li {...props} key={key}>
                  {option.nameTh}
                </li>
              );
            }}
            onChange={(event, value) => {
              event.preventDefault();
              setFieldValue("ethnicity", value?.lovId, true);
            }}
            clearOnEscape
            autoSelect
            autoComplete
            openOnFocus
            renderInput={(params) => (
              <CustomizedField
                label="เชื้อชาติ"
                name="ethnicity"
                {...params}
                onChange={handleChange}
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={6} sx={{ mb: 2 }}>
          <Autocomplete
            id="Nationality"
            {...defaultOptionsProps}
            renderOption={(props, option, index) => {
              const key = `${index}-${option.lovId}`;
              return (
                <li {...props} key={key}>
                  {option.nameTh}
                </li>
              );
            }}
            onChange={(event, value) => {
              event.preventDefault();
              setFieldValue("nationality", value?.lovId, true);
            }}
            clearOnEscape
            autoSelect
            autoComplete
            openOnFocus
            renderInput={(params) => (
              <CustomizedField
                label="สัญชาติ"
                name="nationality"
                {...params}
                onChange={handleChange}
                required
              />
            )}
          />
        </Grid>
      </Grid>
      <CustomizedField
        id="LineId"
        label="Line ID"
        name="lineId"
        value={values.lineId}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <CustomizedField
        id="Facebook"
        label="Facebook"
        name="facebook"
        value={values.facebook}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <CustomizedField
        id="ReferralCode"
        label="User ผู้แนะนำ"
        name="referralCode"
        value={values.referralCode}
        onChange={handleChange}
      />
      <PrimaryButton
        fullWidth
        sx={{ my: 5 }}
        disabled={!(isValid && dirty)}
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
  const user = useSelector(userSelector);
  const [isPageLoading, setIsPageLoading]: [boolean, Function] =
    useState(false);
  const [lovNationality, setLovNationality]: [Array<LovItem>, Function] =
    useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    user && user.errorList != undefined
      ? user.errorList.map((msg) => {
          if (msg != undefined) {
            enqueueSnackbar(msg, {
              variant: "error",
              autoHideDuration: 4000,
              anchorOrigin: { horizontal: "center", vertical: "top" },
            });
          }
        })
      : null;
  }, [user.errorList]);

  useEffect(() => {
    GetLovByType("nationality")
      .then((res) => {
        setLovNationality(res.lovList);
      })
      .catch((err) => {
        console.log(`Err => ${JSON.stringify(err)}`);
      });
  }, []);

  return (
    <PageContainer
      pageName="E-KYC Form"
      loading={isPageLoading}
      loadingMessage="Loading..."
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
            setIsPageLoading(true);
            dispatch(submitKycFormAsync(values))
              .then((res) => {
                dispatch(setTitlePage("ระบบกำลังตรวจสอบข้อมูล"));
                dispatch(
                  setDetailPage(
                    "คุณจะได้รับการแจ้งเตือนผ่านอีเมลหลังจากระบบตรวจสอบข้อมูลสำเร็จ"
                  )
                );
                setIsPageLoading(false);
              })
              .catch((err) => {
                console.log("ERR");
                console.log(JSON.stringify(err));
                setIsPageLoading(false);
              });
          }}
        >
          {(ekycFormProps) => ekycForm(ekycFormProps, lovNationality)}
        </Formik>
      </Box>
    </PageContainer>
  );
}

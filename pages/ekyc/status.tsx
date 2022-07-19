import CreadinityLoader from "@/components/displays/CreadinityLoader";
import PrimaryButton from "@/components/inputs/PrimaryButton";
import CredinityFooter from "@/components/layouts/CredinityFooter";
import PageContainer from "@/components/layouts/PageContainer";
import { Gainsboro, Primary } from "@/models/constants/color.constant";
import { UserID } from "@/models/constants/key.constant";
import Logo from "@/public/img/logo/credinity-tr-txt.png";
import { getProfileAsync, userSelector } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";

export default function StatusPage() {
  const cookies = new Cookies();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useSelector(userSelector);

  const [isPageLoading, setIsPageLoading] = useState(false);

  const fetchUserProfile = useCallback(() => {
    let id = cookies.get(UserID);
    if (id != "") {
      dispatch(getProfileAsync({ userId: id }));
    }
  }, []);
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <PageContainer
      pageName="E-KYC Status"
      loading={isPageLoading}
      loadingMessage="Redirecting..."
      backgroundColor={Gainsboro}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ mx: "5vw" }}
      >
        {user.ekycStatus == undefined ? (
          <CreadinityLoader />
        ) : (
          <>
            <Box sx={{ mx: "10vw", mt: "10vh" }}>
              <Image src={Logo}></Image>
            </Box>

            <Card>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ mt: 10 }}>
                  {user && user.ekycStatus == 1 ? (
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      size="6x"
                      color={Primary}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      size="6x"
                      color={Gainsboro}
                    />
                  )}
                </Box>
                <Typography
                  textAlign="center"
                  variant="h1"
                  fontWeight="bold"
                  sx={{ wordWrap: "break-word", my: 4 }}
                >
                  {user && user.ekycStatus == 1 ? (
                    <>ยืนยันบัญชีผู้ใช้แล้ว</>
                  ) : (
                    <>ดำเนินการไม่สำเร็จ</>
                  )}
                </Typography>
                <Typography
                  textAlign="center"
                  variant="body1"
                  sx={{ wordWrap: "break-word", mb: 4 }}
                >
                  {user && user.ekycStatus == 1 ? (
                    <>
                      คุณสร้างบัญชี Credinity สำเร็จแล้ว
                      กรุณาเก็บข้อมูลของท่านเพื่อใช้ในการใช้เว็บไซต์ต่อไป
                    </>
                  ) : (
                    <>
                      ไม่พบข้อมูลกรุณาลองใหม่อีกครั้ง{<br />}
                      หากท่านเป็นผู้ลงทะเบียนใหม่โปรดตรวจสอบสถานะของท่านอีกครั้งภายหลัง
                    </>
                  )}
                </Typography>
                <PrimaryButton
                  sx={{ wordWrap: "break-word", mb: 10, width: "50vw" }}
                  onClick={() => {
                    setIsPageLoading(true);
                    router.push("/");
                    setIsPageLoading(false);
                  }}
                >
                  {user && user.ekycStatus == 1 ? (
                    <>กลับสู่หน้าหลัก</>
                  ) : (
                    <>ปิด</>
                  )}
                </PrimaryButton>
              </CardContent>
            </Card>
            <CredinityFooter sx={{ mt: "auto", mb: "10px" }} />
          </>
        )}
      </Stack>
    </PageContainer>
  );
}

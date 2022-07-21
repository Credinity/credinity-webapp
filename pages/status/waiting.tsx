import PrimaryButton from "@/components/inputs/PrimaryButton";
import AppBarHeader from "@/components/layouts/AppBarHeader";
import PageContainer from "@/components/layouts/PageContainer";
import { Gainsboro, Primary } from "@/models/constants/color.constant";
import { pageSelector } from "@/store/slices/pageSlice";
import { faHourglass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function WaitingStatusPage() {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const router = useRouter();
  const page = useSelector(pageSelector);

  return (
    <PageContainer
      pageName="Waiting Status"
      loading={isPageLoading}
      loadingMessage="Redirecting..."
    >
      <AppBarHeader isShowBackButton={true} />
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
            router.push("/").finally(() => {
              setIsPageLoading(false);
            });
          }}
        >
          ตกลง
        </PrimaryButton>
      </Box>
    </PageContainer>
  );
}

import * as React from "react";
import Typography from "@mui/material/Typography";
import { Divider, Grid, Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faLine,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import {
  AntiFlashWhite,
  DarkCharcoal,
  Gray,
} from "@/public/constants/color.constant";
import DarkTypography from "@/components/displays/DarkTypography";

export default function CredinityFullFooter() {
  return (
    <Grid
      container
      direction="column"
      sx={{ color: Gray, backgroundColor: DarkCharcoal }}
    >
      <Grid container sx={{ my: 2 }}>
        <Grid container item xs={3} justifyContent="center">
          <Image
            alt="logo"
            src="/img/credinity-tr-logo.png"
            width={40}
            height={40}
            objectFit="contain"
          />
        </Grid>
        {/* icon and (email/phone) */}
        <Grid container item xs={9} direction="column" justifyContent="center">
          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center", ml: 2 }}
          >
            <FontAwesomeIcon icon={faEnvelope} inverse />
            {/* //todo : Change Email */}
            <DarkTypography variant="body2" sx={{ ml: 2 }}>
              Email: credinitygroup@gmail.com
            </DarkTypography>
          </Stack>
          <Stack
            direction="row"
            sx={{ display: "flex", alignItems: "center", ml: 2, mt: 1 }}
          >
            <FontAwesomeIcon icon={faPhone} inverse />
            <DarkTypography variant="body2" sx={{ ml: 2 }}>
              Call: 035-xxx-xxx
            </DarkTypography>
          </Stack>
        </Grid>
      </Grid>
      <Grid container>
        <Grid container item xs={5} />
        <Grid container item xs={7} direction="row">
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon icon={faFacebookSquare} inverse size="2x" />
            <FontAwesomeIcon icon={faLine} inverse size="2x" />
            <FontAwesomeIcon icon={faLinkedinIn} inverse size="2x" />
          </Stack>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 2 }}>
        <Grid container item xs={6} justifyContent="start">
          <Typography variant="body2" sx={{ ml: 4, color: AntiFlashWhite }}>
            POPULAR SEARCHES
          </Typography>
        </Grid>
        <Grid container item xs={6} direction="column">
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: "flex", alignItems: "flex-start", ml: 3 }}
          >
            <DarkTypography variant="body2">NEWS</DarkTypography>
            <DarkTypography variant="body2">THE INVESTOR</DarkTypography>
            <DarkTypography variant="body2">THE LOANEE</DarkTypography>
          </Stack>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 2 }}>
        <Grid container item xs={6} justifyContent="start">
          <Typography variant="body2" sx={{ ml: 4, color: AntiFlashWhite }}>
            ABOUT
          </Typography>
        </Grid>
        <Grid container item xs={6} direction="column">
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: "flex", alignItems: "flex-start", ml: 3 }}
          >
            <DarkTypography variant="body2">ABOUT US</DarkTypography>
            <DarkTypography variant="body2">FAQ</DarkTypography>
          </Stack>
        </Grid>
      </Grid>
      <Grid item>
        <Divider sx={{ backgroundColor: Gray, my: 2 }} />
        <Typography
          variant="body2"
          align="center"
          sx={{ color: AntiFlashWhite, mb: 2 }}
        >
          ©2022 Credinity .. All right reserved
        </Typography>
      </Grid>
    </Grid>
  );
}

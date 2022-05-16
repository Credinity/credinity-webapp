import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Box } from "@mui/material";
import { Black, Gainsboro } from "@/public/constants/color.constant";
import { h3 } from "@/public/constants/typography.constant";

//ยังไม่เสร็จ
const InputStyle = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(4),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    border: `1px solid ${Gainsboro}`,
    fontSize: 16,
    width: "full",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: "Kanit",
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

type props = {
  Title: "";
  Text: "";
};

export default function CrTextField({ Title, Text }: props) {
  return (
    <Box sx={{ px: 3 }}>
      <FormControl variant="standard" fullWidth={true}>
        <InputLabel
          color="secondary"
          sx={{ color: Black, fontSize: h3 }}
          shrink
          htmlFor="InputStyle"
        >
          {Title}
        </InputLabel>
        <InputStyle placeholder={Title} id="InputStyle" />
      </FormControl>
    </Box>
  );
}

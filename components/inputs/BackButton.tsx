import { Black } from "@/models/constants/color.constant";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { SxProps, Theme } from "@mui/material/styles";
import { useRouter } from "next/router";

type Props = {
  text?: string;
  path?: string;
  sxButton?: SxProps<Theme>;
};

export default function BackButton(props: Props) {
  let sxProps;
  const router = useRouter();
  if (props.sxButton == undefined) {
    //default value
    sxProps = { color: Black };
  } else {
    sxProps = props.sxButton;
  }
  return (
    <>
      {props.text != undefined ? (
        <Button
          variant="text"
          sx={sxProps}
          onClick={() => {
            props.path != undefined ? router.push(props.path) : router.back();
          }}
        >
          <ArrowBackIosIcon />
          <Typography variant="button">{props.text}</Typography>
        </Button>
      ) : (
        <IconButton
          sx={sxProps}
          onClick={() => {
            props.path != undefined ? router.push(props.path) : router.back();
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
      )}
    </>
  );
}

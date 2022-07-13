import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import { useAppDispatch } from "@/store/store";
import { pageSelector, setIsOpenDialog } from "@/store/slices/pageSlice";
import { useSelector } from "react-redux";

type Props = {
  alertType: AlertColor;
  message: string;
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

export default function CustomizedSnackbars(props: Props) {
  const dispatch = useAppDispatch();
  const page = useSelector(pageSelector);
  const handleClose = () => {
    dispatch(setIsOpenDialog(false));
  };
  return (
    <Snackbar
      open={page.isOpenAlert}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={props.alertType}>
        {props.message}
      </Alert>
    </Snackbar>
  );
}

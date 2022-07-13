import { IconButton } from "@mui/material";

import { useSnackbar } from "notistack";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";

function SnackbarCloseButton({ id }: any) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(id)}>
      <CloseIcon />
    </IconButton>
  );
}

export default SnackbarCloseButton;

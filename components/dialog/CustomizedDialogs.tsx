import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import {
  pageSelector,
  setIsOpenPrivacyConterm,
} from "@/store/slices/pageSlice";
import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{ m: 0, p: 2 }}
      {...other}
      style={{ fontWeight: "bold", fontSize: 35 }}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  title: string;
  htmlDetail: string;
};

export default function CustomizedDialogs({ title, htmlDetail }: Props) {
  const dispatch = useAppDispatch();
  const page = useSelector(pageSelector);
  const handleClose = () => {
    dispatch(setIsOpenPrivacyConterm(false));
  };

  return (
    <>
      <BootstrapDialog
        TransitionComponent={Transition}
        keepMounted
        scroll="paper"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={page.isOpenPrivacyConterm}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography dangerouslySetInnerHTML={{ __html: htmlDetail }} />
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}

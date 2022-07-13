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
import { pageSelector, setIsOpenDialog } from "@/store/slices/pageSlice";
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
      variant="h1"
      style={{ fontWeight: "bold" }}
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
  htmlDetail?: string;
  message?: string;
};

export default function CustomizedDialogs(props: Props) {
  const dispatch = useAppDispatch();
  const page = useSelector(pageSelector);
  const handleClose = () => {
    dispatch(setIsOpenDialog(false));
  };

  return (
    <>
      <BootstrapDialog
        TransitionComponent={Transition}
        keepMounted
        scroll="paper"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={page.isOpenDialog}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {props.title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {props.htmlDetail ? (
            <Typography
              dangerouslySetInnerHTML={{ __html: props.htmlDetail }}
            />
          ) : null}
          {props.message ? (
            <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
              {props.message}
            </Typography>
          ) : null}
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}

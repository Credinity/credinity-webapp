import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import { AppBar, ListItemButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CredinityFooter from "./CredinityFooter";
import { White } from "@/public/constants/color.constant";
import Image from "next/image";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
// import { setRequestSuccess, userSelector } from "@/store/slices/userSlice";
// import { useSelector } from "react-redux";
// import { useAppDispatch } from "@/store/store";
//import PageContainer from "../layout/pageContainer";

const anchor = "right";
const HeaderBar = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: "8vh",
  minWidth: "100%",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const menuArray = [
  { key: "LOG IN", value: "/auth/signIn" },
  { key: "REGISTER", value: "/auth/signUp" },
  { key: "INVESTOR", value: "" },
  { key: "LOAN", value: "" },
  { key: "NEWS", value: "" },
  { key: "ABOUT US", value: "" },
  { key: "PROFILE", value: "" },
];
export default function DrawerMenu() {
  //const user = useSelector(userSelector);
  //const dispatch = useAppDispatch();
  const router = useRouter();
  const [state, setState] = React.useState({
    right: false,
  });
  const routePage = (path: string) => {
    //dispatch(setRequestSuccess(true));
    router.push(path);
    //dispatch(setRequestSuccess(false));
  };
  const toggleDrawer =
    (anchor: "right", open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  return (
    <Box key={anchor} sx={{ backgroundColor: White }}>
      <IconButton
        onClick={toggleDrawer(anchor, true)}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon color="secondary" />
      </IconButton>
      <SwipeableDrawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
        onOpen={toggleDrawer(anchor, true)}
      >
        <HeaderBar>
          <AppBar
            position="static"
            elevation={0}
            sx={{ backgroundColor: White }}
          >
            <Toolbar>
              <Image
                alt="logo"
                src="/img/credinity-tr-logo.png"
                width={40}
                height={40}
              />

              <Box sx={{ flexGrow: 1 }} />
              <Box
                role="presentation"
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
              >
                <IconButton>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </HeaderBar>

        <Box minWidth="100vw" minHeight="100%">
          <List sx={{ mt: 4, ml: 1 }}>
            {menuArray.map(({ key, value }, index) => (
              <ListItemButton
                key={index}
                sx={{ mb: 1 }}
                onClick={() => {
                  value ? routePage(value) : null;
                }}
              >
                <Typography variant="h2">{key}</Typography>
              </ListItemButton>
            ))}
          </List>
          <Box sx={{ flexGrow: 1, height: "15%" }} />

          <CredinityFooter />
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}

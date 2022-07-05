import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import {
  AppBar,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CredinityFooter from "@/components/layouts/CredinityFooter";
import { Gainsboro, White } from "@/public/constants/color.constant";
import Image from "next/image";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { pageSelector } from "@/store/slices/pageSlice";
import {
  AuthorizedMenu,
  UnAuthorizedMenu,
} from "@/public/constants/menu.constant";
import { useEffect } from "react";

const anchor = "right";
const HeaderBar = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: "8vh",
  minWidth: "100%",
  ...theme.mixins.toolbar,
}));

const MenuList = () => {
  const router = useRouter();
  const page = useSelector(pageSelector);

  return page.isContainTokenCookie ? (
    <Box
      minWidth="100vw"
      minHeight="92vh"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <List sx={{ mt: 4, ml: 1 }}>
        {AuthorizedMenu.map(({ name, path }, index) => (
          <Box key={index}>
            <ListItem
              sx={{ mb: 1 }}
              onClick={() => {
                path ? router.push(path) : null;
              }}
            >
              <ListItemButton>
                <ListItemText
                  primary={<Typography variant="h3">{name}</Typography>}
                />
              </ListItemButton>
            </ListItem>
            <Divider
              variant="middle"
              sx={{ mx: 4, backgroundColor: Gainsboro }}
            />
          </Box>
        ))}
      </List>
      <Box minHeight="20px" />
      <CredinityFooter sx={{ mt: "auto", mb: "10px" }} />
    </Box>
  ) : (
    <Box
      minWidth="100vw"
      minHeight="92vh"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <List sx={{ mt: 4, ml: 1 }}>
        {UnAuthorizedMenu.map(({ name, path }, index) => (
          <Box key={index}>
            <ListItem
              sx={{ mb: 1 }}
              onClick={() => {
                path ? router.push(path) : null;
              }}
            >
              <ListItemButton>
                <ListItemText
                  primary={<Typography variant="h3">{name}</Typography>}
                />
              </ListItemButton>
            </ListItem>
            <Divider
              variant="middle"
              sx={{ mx: 4, backgroundColor: Gainsboro }}
            />
          </Box>
        ))}
      </List>
      <Box minHeight="20px" />
      <CredinityFooter sx={{ mt: "auto", mb: "10px" }} />
    </Box>
  );
};

export default function DrawerMenu() {
  const [state, setState] = React.useState({
    right: false,
  });

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
        {MenuList()}
      </SwipeableDrawer>
    </Box>
  );
}

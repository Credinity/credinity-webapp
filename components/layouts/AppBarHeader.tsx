import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import DrawerMenu from "@/components/displays/DrawerMenu";
import { White } from "@/public/constants/color.constant";
import Image from "next/image";
import { MenuArrItem } from "@/models/page.model";

export default function AppBarHeader() {
  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: White }}>
      <Toolbar>
        <Image
          alt="logo"
          src="/img/credinity-tr-logo.png"
          width={40}
          height={40}
        />
        <Box sx={{ flexGrow: 1 }} />
        <DrawerMenu />
      </Toolbar>
    </AppBar>
  );
}

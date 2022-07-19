import DrawerMenu from "@/components/displays/DrawerMenu";
import BackButton from "@/components/inputs/BackButton";
import { White } from "@/models/constants/color.constant";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";

type Props = {
  isShowBackButton?: boolean;
};

export default function AppBarHeader(props: Props) {
  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: White }}>
      <Toolbar>
        {props.isShowBackButton ? (
          <BackButton />
        ) : (
          <Image
            alt="logo"
            src="/img/logo/credinity-tr-logo.png"
            width={40}
            height={40}
          />
        )}

        <Box sx={{ flexGrow: 1 }} />
        <DrawerMenu />
      </Toolbar>
    </AppBar>
  );
}

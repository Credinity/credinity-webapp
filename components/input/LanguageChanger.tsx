//#region Required
import { FunctionComponent, useState } from "react";
//#endregion

//#region UI Components
import { Grid, Button, Typography, Menu, MenuItem } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
//#endregion

const LanguageChanger: FunctionComponent<any> = (props: any) => {
    const [lang, setLang] = useState("EN");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChangeLang = (newLang: string) => {
        setLang(newLang);
        handleClose();
    };

    const getFullLang = (langAbbrv: string) => {
        switch (langAbbrv) {
            case "TH":
                return "Thai";
            case "EN":
            default:
                return "English";
        }
    };
    return (
        <Grid
            container
            style={{ position: "absolute", bottom: "40px" }}
            justifyContent="center"
        >
            <Grid item xs="auto">
                <Typography display="inline" fontWeight="medium">
                    Choose Language:
                </Typography>
                <Button
                    onClick={handleClick}
                    style={{
                        textTransform: "none",
                        color: "black",
                        fontWeight: "medium",
                    }}
                >
                    {getFullLang(lang)} <ArrowDropDown />
                </Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={(e: any) => handleChangeLang("EN")}>
                        English
                    </MenuItem>
                    <MenuItem
                        onClick={(e) => handleChangeLang("TH")}
                        disabled={true}
                    >
                        Thai
                    </MenuItem>
                </Menu>
            </Grid>
        </Grid>
    );
};

export default LanguageChanger;

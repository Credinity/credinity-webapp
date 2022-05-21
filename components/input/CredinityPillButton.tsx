//#region Required
import { FunctionComponent } from "react";
//#endregion

//#region UI Components
import { Button } from "@mui/material";
//#endregion

const CredinityPillButton: FunctionComponent<any> = (props: any) => {
    let baseStyle = {
        ...props.style,
        textTransform: "none",
        width: "100%",
        borderRadius: "50px",
    };
    return (
        <Button
            variant="outlined"
            color="secondary"
            style={baseStyle}
            {...props}
        >
            {props.children}
        </Button>
    );
};

export default CredinityPillButton;

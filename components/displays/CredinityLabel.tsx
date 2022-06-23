import { Typography } from "@mui/material";
import { FunctionComponent } from "react";

const CredinityLabel: FunctionComponent<any> = (props: any) => {
    return <Typography {...props} fontWeight="medium" style={props.style} />;
};

export default CredinityLabel;

//#region Required
import { FunctionComponent } from "react";
//#endregion

//#region UI Components
import { TextField, TextFieldProps } from "@mui/material";
import CredinityLabel from "../display/CredinityLabel";
//#endregion

const CredinityTextField: FunctionComponent<any> = ({
    label,
    labelProps,
    textFieldProps,
}: {
    label: string;
    labelProps: any;
    textFieldProps: TextFieldProps;
}) => {
    return (
        <>
            {label ? <CredinityLabel>{label}</CredinityLabel> : null}
            <TextField
                sx={{ mt: "10px" }}
                variant="outlined"
                name="email"
                fullWidth
                inputProps={{
                    style: { padding: "5px 20px 5px 20px" },
                }}
                {...textFieldProps}
            />
        </>
    );
};

export default CredinityTextField;

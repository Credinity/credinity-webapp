import { CircularProgress, Typography } from "@mui/material";
import Head from "next/head";
import { FunctionComponent } from "react";

const PageContainer: FunctionComponent<any> = (props: any) => {
    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#EEE",
            }}
        >
            <Head>
                <title>{props.pageName}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {props.loading ? <CreadinityLoader /> : null}
            {props.children}
        </div>
    );
};

const CreadinityLoader: FunctionComponent<any> = ({
    loadingMessage,
}: {
    loadingMessage: string;
}) => {
    return (
        <div
            style={{
                zIndex: 999,
                position: "fixed",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.50)",
            }}
        >
            <CircularProgress />
            <Typography variant="h6" style={{ marginTop: "10px" }}>
                {loadingMessage ?? "Loading..."}
            </Typography>
        </div>
    );
};
export default PageContainer;

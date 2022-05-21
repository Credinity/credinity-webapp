import {
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Typography,
} from "@mui/material";
import Head from "next/head";
import { FunctionComponent } from "react";

const PageContainer: FunctionComponent<any> = (props: any) => {
    return (
        <div
            style={{
                minHeight: "100vh",
            }}
        >
            <Head>
                <title>{props.pageName}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {props.loading ? (
                <CreadinityLoader loadingMessage={props.loadingMessage} />
            ) : null}
            <Grid container justifyContent="center">
                <Grid item xs={12} md={4} lg={3} xl={2}>
                    {props.children}
                </Grid>
            </Grid>
        </div>
    );
};

const CreadinityLoader: FunctionComponent<any> = ({
    loadingMessage,
}: {
    loadingMessage: string;
}) => {
    return (
        <Grid
            container
            justifyContent="center"
            alignContent="center"
            alignItems="center"
            style={{
                zIndex: 999,
                position: "fixed",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                backgroundColor: "rgba(50, 50, 50, 0.50)",
            }}
        >
            <Card>
                <CardContent sx={{ p: 3 }}>
                    <Grid
                        container
                        justifyContent="center"
                        alignContent="center"
                        alignItems="center"
                    >
                        <Grid item xs="auto" alignSelf="center">
                            <CircularProgress />
                        </Grid>
                        <Grid item xs={12} alignSelf="center">
                            <Typography
                                variant="h6"
                                align="center"
                                style={{ marginTop: "10px" }}
                            >
                                {loadingMessage ?? "Loading..."}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
};
export default PageContainer;

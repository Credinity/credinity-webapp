import PageContainer from "@/components/layouts/PageContainer";
import { Button, Grid, Link, Paper, Typography } from "@mui/material";
import { useState } from "react";

export default function SignUpCompletePage() {
  const [isPageLoading, setIsPageLoading] = useState(false);
  return (
    <PageContainer
      pageName="Sign Up"
      loading={isPageLoading}
      loadingMessage="Redirecting..."
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Grid item xs={12} sx={{ mx: 4 }}>
            <Typography variant="h4" align="center" fontWeight="bold">
              Verify Your Email Address
            </Typography>
            <Typography variant="h5" align="center" sx={{ mt: 2 }}>
              To continue using Credinity {<br />} please verify your email
              address.
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2, mx: 4 }}>
            <Button
              type="button"
              variant="contained"
              color="primary"
              fullWidth
              disabled
            >
              <Typography>VERIFY EMAIL</Typography>
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ mt: 2 }}
            justifyContent="center"
            alignItems="center"
            display="flex"
          >
            <Typography display="inline" variant="h5" sx={{ mr: 1 }}>
              <Link
                href=""
                color="primary"
                onClick={(e) => {
                  //todo: need design
                  e.preventDefault();
                }}
              >
                Trouble verifying?
              </Link>
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    </PageContainer>
  );
}

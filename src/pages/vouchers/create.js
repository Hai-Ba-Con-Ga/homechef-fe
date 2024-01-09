import { VoucherCreateForm } from '@/sections/dashboard/voucher/voucher-create-form';
import { Box, Unstable_Grid2 as Grid, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import { usePageView } from '../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../layouts/dashboard';

const Page = () => {
  usePageView();

  return (
    <>
      <Head>
        <title>
          Voucher Create | HomeChef
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexGrow: 1
        }}
      >
        <Grid
          container
          sx={{ flexGrow: 1 }}
        >
          <Grid
            xs={12}
            sm={4}
            sx={{
              backgroundImage: 'url(/assets/people-talking.png)',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              display: {
                xs: 'none',
                md: 'block'
              }
            }}
          />
          <Grid
            xs={12}
            md={8}
            sx={{
              p: {
                xs: 4,
                sm: 6,
                md: 8
              }
            }}
          >
            <Stack
              maxWidth="sm"
              spacing={3}
            >
              <Typography variant="h4">
                Create Voucher
              </Typography>
              <VoucherCreateForm />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;

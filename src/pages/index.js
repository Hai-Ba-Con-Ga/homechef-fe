import {
  Box,
  Button,
  Container,
  Unstable_Grid2 as Grid,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import RefreshCcw01Icon from "@untitled-ui/icons-react/build/esm/RefreshCcw01";
import Head from "next/head";
import { usePageView } from "../hooks/use-page-view";
import { useSettings } from "../hooks/use-settings";
import { Layout as DashboardLayout } from "../layouts/dashboard";
import { EcommerceCostBreakdown } from "../sections/dashboard/ecommerce/ecommerce-cost-breakdown";
import { EcommerceProducts } from "../sections/dashboard/ecommerce/ecommerce-products";
import { EcommerceSalesByCountry } from "../sections/dashboard/ecommerce/ecommerce-sales-by-country";
import { EcommerceSalesRevenue } from "../sections/dashboard/ecommerce/ecommerce-sales-revenue";
import { EcommerceStats } from "../sections/dashboard/ecommerce/ecommerce-stats";

const Page = () => {
  const settings = useSettings();

  usePageView();

  return (
    <>
      <Head>
        <title>Dashboard | HomeChef</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : "xl"}>
          <Grid
            container
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <div>
                  <Typography variant="h4">Overview</Typography>
                </div>
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Button
                    startIcon={
                      <SvgIcon>
                        <RefreshCcw01Icon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Sync Data
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} lg={8}>
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4,
                }}
              >
                <EcommerceStats cost={99700} profit={32100} sales={152000} />
                <EcommerceSalesRevenue
                  chartSeries={[
                    {
                      name: "New Customers",
                      data: [
                        3350, 1840, 2254, 5780, 9349, 5241, 2770, 2051, 3764,
                        2385, 5912, 8323,
                      ],
                    },
                  ]}
                />
                <EcommerceSalesByCountry
                  sales={[
                    {
                      id: "us",
                      amount: 60,
                      country: "District 1",
                    },
                    {
                      id: "es",
                      amount: 20,
                      country: "District 2",
                    },
                    {
                      id: "uk",
                      amount: 10,
                      country: "Binh Thanh",
                    },
                    {
                      id: "de",
                      amount: 5,
                      country: "Thu Duc",
                    },
                    {
                      id: "ca",
                      amount: 5,
                      country: "District 9",
                    },
                  ]}
                />
              </Stack>
            </Grid>
            <Grid xs={12} lg={4}>
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4,
                }}
              >
                <EcommerceProducts
                  products={[
                    {
                      id: "5eff2512c6f8737d08325676",
                      image: "/assets/avatars/avatar-carson-darrin.png",
                      name: "Cleveland",
                      sales: 22,
                    },
                    {
                      id: "5e887b7602bdbc4dbb234b27",
                      image: "/assets/avatars/avatar-fran-perez.png",
                      name: "Atlanta",
                      sales: 18,
                    },
                    {
                      id: "5e86809283e28b96d2d38537",
                      image: "/assets/avatars/avatar-anika-visser.png",
                      name: "Jie Yan Song",
                      sales: 15,
                    },
                    {
                      id: "5eff251e297fd17f0dc18a8b",
                      image: "/assets/avatars/avatar-miron-vitold.png",
                      name: "Necessaire",
                      sales: 14,
                    },
                    {
                      id: "5eff2524ef813f061b3ea39f",
                      image: "/assets/avatars/avatar-anika-visser.png",
                      name: "Soja CO",
                      sales: 10,
                    },
                  ]}
                />
                <EcommerceCostBreakdown
                  chartSeries={[14859, 35690, 45120, 25486]}
                  labels={["Strategy", "Outsourcing", "Marketing", "Other"]}
                />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

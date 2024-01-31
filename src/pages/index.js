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
                <EcommerceStats sales={40} customers={20} chefs={5} />
                <EcommerceSalesRevenue
                  chartSeries={[
                    {
                      name: "Orders",
                      data: [3, 4, 7, 3, 2, 4, 7, 10],
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
                      name: "Hong Tran",
                      sales: 18,
                    },
                    {
                      id: "5e887b7602bdbc4dbb234b27",
                      image: "/assets/avatars/avatar-fran-perez.png",
                      name: "Cat Nguyen",
                      sales: 15,
                    },
                    {
                      id: "5e86809283e28b96d2d38537",
                      image: "/assets/avatars/avatar-anika-visser.png",
                      name: "Thuy Tien",
                      sales: 10,
                    },
                    {
                      id: "5eff251e297fd17f0dc18a8b",
                      image: "/assets/avatars/avatar-miron-vitold.png",
                      name: "Van Do",
                      sales: 9,
                    },
                    {
                      id: "5eff2524ef813f061b3ea39f",
                      image: "/assets/avatars/avatar-anika-visser.png",
                      name: "Hoa Nguyen",
                      sales: 7,
                    },
                  ]}
                  title={"Top Chefs of the Month"}
                />
                {/* <EcommerceCostBreakdown
                  chartSeries={[14859, 35690, 45120, 25486]}
                  labels={["Strategy", "Outsourcing", "Marketing", "Other"]}
                /> */}
                <EcommerceProducts
                  products={[
                    {
                      id: "5eff2512c6f8737d08325676",
                      image: "/assets/products/ga-kho.jpg",
                      name: "Gà kho gừng",
                      sales: 18,
                    },
                    {
                      id: "5e887b7602bdbc4dbb234b27",
                      image: "/assets/products/canh-chua.jpg",
                      name: "Canh chua",
                      sales: 15,
                    },
                    {
                      id: "5e86809283e28b96d2d38537",
                      image: "/assets/products/thit-kho-trung.jpg",
                      name: "Thịt kho tàu",
                      sales: 10,
                    },
                    {
                      id: "5eff251e297fd17f0dc18a8b",
                      image: "/assets/products/thit-nuong.jpeg",
                      name: "Thịt nướng",
                      sales: 9,
                    },
                  ]}
                  title={"Top Meals of the Month"}
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

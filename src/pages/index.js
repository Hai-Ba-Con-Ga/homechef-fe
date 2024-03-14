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
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import Head from "next/head";
import { usePageView } from "../hooks/use-page-view";
import { useSettings } from "../hooks/use-settings";
import { Layout as DashboardLayout } from "../layouts/dashboard";
import { EcommerceProducts } from "../sections/dashboard/ecommerce/ecommerce-products";
import { EcommerceSalesByCountry } from "../sections/dashboard/ecommerce/ecommerce-sales-by-country";
import { EcommerceSalesRevenue } from "../sections/dashboard/ecommerce/ecommerce-sales-revenue";
import { EcommerceStats } from "../sections/dashboard/ecommerce/ecommerce-stats";
import { AnalyticsStats } from "../sections/dashboard/analytics/analytics-stats";
import { dashboardApi } from "@/api/dashboard";
import { useEffect, useState } from "react";

function formatLargeNumber(number) {
  const suffixes = ["", "K", "M", "B", "T"];
  const suffixNum = Math.floor(("" + number).length / 3);
  let shortValue = parseFloat(
    (suffixNum != 0 ? number / Math.pow(1000, suffixNum) : number).toPrecision(
      2
    )
  );
  if (shortValue % 1 != 0) {
    shortValue = shortValue.toFixed(1);
  }
  return shortValue + suffixes[suffixNum];
}

const Page = () => {
  const settings = useSettings();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const result = await dashboardApi.getTransactions();
      console.log(result);
      setData(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

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
            <Grid xs={12} container>
              <Grid xs={12} md={4}>
                <AnalyticsStats
                  chartSeries={[
                    {
                      data: [
                        0, 170, 242, 98, 63, 56, 85, 171, 209, 163, 204, 21,
                        264, 0,
                      ],
                    },
                  ]}
                  title="Revenue Today"
                  value={`${formatLargeNumber(data[0]?.amount)} VND`}
                />
              </Grid>
              <Grid xs={12} md={4}>
                <AnalyticsStats
                  chartSeries={[
                    {
                      data: [
                        0, 245, 290, 187, 172, 106, 15, 210, 202, 19, 18, 3,
                        212, 0,
                      ],
                    },
                  ]}
                  title="Revenue Week"
                  value={`${formatLargeNumber(data[1]?.amount)} VND`}
                />
              </Grid>
              <Grid xs={12} md={4}>
                <AnalyticsStats
                  chartSeries={[
                    {
                      data: [
                        0, 277, 191, 93, 92, 85, 166, 240, 63, 4, 296, 144, 166,
                        0,
                      ],
                    },
                  ]}
                  title="Revenue Month"
                  value={`${formatLargeNumber(data[2]?.amount)} VND`}
                />
              </Grid>
            </Grid>

            {/* <Grid xs={12} md={4}>
              <AnalyticsStats
                action={
                  <Button
                    color="inherit"
                    endIcon={
                      <SvgIcon>
                        <ArrowRightIcon />
                      </SvgIcon>
                    }
                    size="small"
                  >
                    See sources
                  </Button>
                }
                chartSeries={[
                  {
                    data: [
                      0, 170, 242, 98, 63, 56, 85, 171, 209, 163, 204, 21, 264,
                      0,
                    ],
                  },
                ]}
                title="Impressions"
                value="36,6K"
              />
            </Grid> */}
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

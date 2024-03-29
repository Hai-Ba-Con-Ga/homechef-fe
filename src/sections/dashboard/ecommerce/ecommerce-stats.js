import { dashboardApi } from "@/api/dashboard";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import { forEach } from "lodash";
import numeral from "numeral";
import { useCallback, useEffect, useState } from "react";

const sortOptions = [
  {
    label: "This Week",
    value: "week",
  },
  {
    label: "This Month",
    value: "month",
  },
];

let data = [];
let by = ["WEEK", "MONTH"];

// Define a function to handle fetching data for each "by" value
const fetchData = async (by) => {
  try {
    const result = await dashboardApi.getData({ by });
    let sales = 0;
    let customers = 0;
    let chefs = 0;

    result.forEach((item) => {
      switch (item.type) {
        case "ORDER":
          sales += item.total;
          break;
        case "CHEF":
          chefs += item.total;
          break;
        case "CUSTOMER":
          customers += item.total;
          break;
        // Add cases for other types as needed
      }
    });

    const convertedData = {
      label: by.toLowerCase(),
      value: {
        sales: sales,
        customers: customers,
        chefs: chefs,
      },
    };
    data.push(convertedData);
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
by.forEach(fetchData);

export const EcommerceStats = (props) => {
  const [sortBy, setSortBy] = useState("week");
  const [sales, setSales] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [chefs, setChefs] = useState(0);

  const handleSortChange = useCallback(
    (event) => {
      const target = event.target.value;
      setSortBy(target);
    },
    [sortBy]
  );
  useEffect(() => {
    const result = data.find((item) => item.label === sortBy);
    console.log(result);
    if (result) {
      setSales(result.value.sales);
      setCustomers(result.value.customers);
      setChefs(result.value.chefs);
    } else {
      // Handle the case when no data is found for the selected sort option
      setSales(0);
      setCustomers(0);
      setChefs(0);
    }
  }, [sortBy]);

  return (
    <Card>
      <Stack direction="row" justifyContent="space-between" sx={{ p: 3 }}>
        <CardHeader title="Total" sx={{ pb: 0 }} />
        <TextField
          label="Sort By"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </Stack>
      <CardContent>
        <Grid container spacing={3}>
          <Grid xs={12} md={4}>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "neutral.800"
                    : "error.lightest",
                borderRadius: 2.5,
                px: 3,
                py: 4,
              }}
            >
              <Box
                sx={{
                  flexShrink: 0,
                  height: 48,
                  width: 48,
                  "& img": {
                    width: "100%",
                  },
                }}
              >
                <img src="/assets/iconly/iconly-glass-chart.svg" />
              </Box>
              <div>
                <Typography color="text.secondary" variant="body2">
                  Orders
                </Typography>
                <Typography variant="h5">{sales}</Typography>
              </div>
            </Stack>
          </Grid>
          <Grid xs={12} md={4}>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "neutral.800"
                    : "warning.lightest",
                borderRadius: 2.5,
                px: 3,
                py: 4,
              }}
            >
              <Box
                sx={{
                  flexShrink: 0,
                  height: 48,
                  width: 48,
                  "& img": {
                    width: "100%",
                  },
                }}
              >
                <img src="/assets/iconly/iconly-glass-discount.svg" />
              </Box>
              <div>
                <Typography color="text.secondary" variant="body2">
                  Customers
                </Typography>
                <Typography variant="h5">{customers}</Typography>
              </div>
            </Stack>
          </Grid>
          <Grid xs={12} md={4}>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "neutral.800"
                    : "success.lightest",
                borderRadius: 2.5,
                px: 3,
                py: 4,
              }}
            >
              <Box
                sx={{
                  flexShrink: 0,
                  height: 48,
                  width: 48,
                  "& img": {
                    width: "100%",
                  },
                }}
              >
                <img src="/assets/iconly/iconly-glass-tick.svg" />
              </Box>
              <div>
                <Typography color="text.secondary" variant="body2">
                  Chefs
                </Typography>
                <Typography variant="h5">{chefs}</Typography>
              </div>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

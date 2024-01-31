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

const data = [
  {
    label: "week",
    value: {
      sales: 100,
      customers: 200,
      chefs: 300,
    },
  },
  {
    label: "month",
    value: {
      sales: 200,
      customers: 400,
      chefs: 600,
    },
  },
  {
    label: "year",
    value: {
      sales: 300,
      customers: 600,
      chefs: 900,
    },
  },
];

export const EcommerceStats = (props) => {
  // const { sales, customers, chefs } = props;

  // const formattedCustomers = numeral(customers).format("0");
  // const formattedChefs = numeral(chefs).format("0");
  // const formattedSales = numeral(sales).format("0");
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
    setSales(result.value.sales);
    setCustomers(result.value.customers);
    setChefs(result.value.chefs);
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

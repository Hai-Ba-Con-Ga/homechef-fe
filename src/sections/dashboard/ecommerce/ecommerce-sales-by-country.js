import {
  Box,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  Stack,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { EcommerceWorldMap } from './ecommerce-world-map';
import { useEffect, useState } from "react";
import { dashboardApi } from "@/api/dashboard";
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

export const EcommerceSalesByCountry = (props) => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const result = await dashboardApi.getTransactions();
      console.log(result);
      console.log(result[2].amount);
      setData(result);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const { sales } = props;
  const theme = useTheme();
  const markerColor = theme.palette.primary.main;

  return (
    <Card>
      <CardHeader title="Customers in Area" />
      <Stack
        alignItems={{
          md: "center",
        }}
        component={CardContent}
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={3}
        sx={{ pt: 0 }}
      >
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: {
              xs: "100%",
              md: "50%",
              lg: "60%",
            },
          }}
        >
          <EcommerceWorldMap markerColor={markerColor} />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: {
              xs: "100%",
              md: "50%",
              lg: "40%",
            },
          }}
        >
          <Typography color="text.secondary" variant="body2">
            Total
          </Typography>
          <Typography sx={{ mb: 3 }} variant="h5">
            ${formatLargeNumber(data[2]?.amount)} VNĐ
          </Typography>
          <Stack
            component="ul"
            spacing={2}
            sx={{
              listStyle: "none",
              m: 0,
              p: 0,
            }}
          >
            {sales.map((sale) => {
              return (
                <Stack
                  alignItems="center"
                  direction="row"
                  key={sale.id}
                  spacing={1}
                >
                  <Stack spacing={1} sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2">{sale.country}</Typography>
                    <Stack alignItems="center" direction="row" spacing={3}>
                      <LinearProgress
                        sx={{ flexGrow: 1 }}
                        value={sale.amount}
                        variant="determinate"
                      />
                      <Typography>{sale.amount}%</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};

EcommerceSalesByCountry.propTypes = {
  sales: PropTypes.array.isRequired
};

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



export const EcommerceSalesByCountry = (props) => {
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
            $152K
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

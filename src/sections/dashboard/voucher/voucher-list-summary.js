import ReceiptIcon from "@untitled-ui/icons-react/build/esm/Receipt";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { getRandomInt } from "@/utils/get-random-int";
export const VoucherListSummary = () => (
  <div>
    <Grid container spacing={3}>
      <Grid xs={12} md={6} lg={4}>
        <Card>
          <CardContent>
            <Stack alignItems="center" direction="row" spacing={2}>
              <Avatar
                sx={{
                  height: 48,
                  width: 48,
                }}
              >
                <ReceiptIcon />
              </Avatar>
              <div>
                <Typography color="text.secondary" variant="body2">
                  Total
                </Typography>
                <Typography variant="h6">
                  {getRandomInt(1000, 10000)}
                </Typography>
              </div>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </div>
);

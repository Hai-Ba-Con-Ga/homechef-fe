import { vouchersApi } from "@/api/vouchers";
import { VoucherEditForm } from "@/sections/dashboard/voucher/voucher-edit-form";
import {
  Box,
  Container,
  Link,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useMounted } from "../../../hooks/use-mounted";
import { usePageView } from "../../../hooks/use-page-view";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { paths } from "../../../paths";
const useVoucher = () => {
  const isMounted = useMounted();
  const [voucher, setVoucher] = useState(null);
  const router = useRouter();
  const { voucherId } = router.query;
  const getVoucher = useCallback(async () => {
    try {
      const response = await vouchersApi.getVoucher({ voucherId });

      if (isMounted()) {
        setVoucher(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getVoucher();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return voucher;
};

const Page = () => {
  const voucher = useVoucher();

  usePageView();

  if (!voucher) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Voucher Edit | HomeChef</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Stack spacing={4}>
              <div>
                <Link
                  color="text.primary"
                  component={NextLink}
                  href={paths.vouchers.index}
                  sx={{
                    alignItems: "center",
                    display: "inline-flex",
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">Voucher</Typography>
                </Link>
              </div>
            </Stack>
            <VoucherEditForm voucher={voucher} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

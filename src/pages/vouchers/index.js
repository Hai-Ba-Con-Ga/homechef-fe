import {
  Box,
  Button,
  Divider,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import FilterFunnel01Icon from "@untitled-ui/icons-react/build/esm/FilterFunnel01";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import Head from "next/head";
import NextLink from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { vouchersApi } from "../../api/vouchers";
import { useMounted } from "../../hooks/use-mounted";
import { usePageView } from "../../hooks/use-page-view";
import { Layout as DashboardLayout } from "../../layouts/dashboard";
import { paths } from "../../paths";
import { VoucherListContainer } from "../../sections/dashboard/voucher/voucher-list-container";
import { VoucherListSidebar } from "../../sections/dashboard/voucher/voucher-list-sidebar";
import { VoucherListSummary } from "../../sections/dashboard/voucher/voucher-list-summary";
import { VoucherListTable } from "../../sections/dashboard/voucher/voucher-list-table";

const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      code: [],
      startDate: undefined,
      endDate: undefined,
      query: "",
    },
    page: 0,
    rowsPerPage: 5,
  });

  return {
    search,
    updateSearch: setSearch,
  };
};

const useVouchers = (search) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    vouchers: [],
    vouchersCount: 0,
  });

  const getVouchers = useCallback(async () => {
    try {
      const response = await vouchersApi.getVouchers(search);
      console.log(response);
      if (isMounted()) {
        setState({
          vouchers: response.data,
          vouchersCount: response.count,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [search, isMounted]);

  useEffect(() => {
    getVouchers();
  }, [search]);
  return state;
};

const Page = () => {
  const rootRef = useRef(null);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [group, setGroup] = useState(true);
  const [openSidebar, setOpenSidebar] = useState(lgUp);
  const { search, updateSearch } = useSearch();
  const { vouchers, vouchersCount } = useVouchers(search);

  usePageView();

  const handleGroupChange = useCallback((event) => {
    setGroup(event.target.checked);
  }, []);

  const handleFiltersToggle = useCallback(() => {
    setOpenSidebar((prevState) => !prevState);
  }, []);

  const handleFiltersChange = useCallback(
    (filters) => {
      updateSearch((prevState) => ({
        ...prevState,
        filters,
        page: 0,
      }));
    },
    [updateSearch]
  );

  const handleFiltersClose = useCallback(() => {
    setOpenSidebar(false);
  }, []);

  const handlePageChange = useCallback(
    (event, page) => {
      updateSearch((prevState) => ({
        ...prevState,
        page,
      }));
    },
    [updateSearch]
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      updateSearch((prevState) => ({
        ...prevState,
        rowsPerPage: parseInt(event.target.value, 10),
      }));
    },
    [updateSearch]
  );

  return (
    <>
      <Head>
        <title>Vouchers | HomeChef</title>
      </Head>
      <Divider />
      <Box
        component="main"
        sx={{
          display: "flex",
          flex: "1 1 auto",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            bottom: 0,
            display: "flex",
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          <VoucherListSidebar
            container={rootRef.current}
            filters={search.filters}
            group={group}
            onFiltersChange={handleFiltersChange}
            onClose={handleFiltersClose}
            onGroupChange={handleGroupChange}
            open={openSidebar}
          />
          <VoucherListContainer open={openSidebar}>
            <Stack spacing={4}>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={3}
              >
                <div>
                  <Typography variant="h4">Vouchers</Typography>
                </div>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon>
                        <FilterFunnel01Icon />
                      </SvgIcon>
                    }
                    onClick={handleFiltersToggle}
                  >
                    Filters
                  </Button>
                  <Button
                    startIcon={
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                    component={NextLink}
                    href={paths.vouchers.create}
                  >
                    New
                  </Button>
                </Stack>
              </Stack>
              <VoucherListSummary />
              <VoucherListTable
                group={group}
                vouchers={vouchers}
                vouchersCount={vouchersCount}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={search.page}
                rowsPerPage={search.rowsPerPage}
              />
            </Stack>
          </VoucherListContainer>
        </Box>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

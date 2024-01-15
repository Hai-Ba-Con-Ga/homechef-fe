import { chefsApi } from "@/api/chefs";
import {
  Box,
  Card,
  Container,
  Stack,
  Typography
} from "@mui/material";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useMounted } from "../../hooks/use-mounted";
import { usePageView } from "../../hooks/use-page-view";
import { Layout as DashboardLayout } from "../../layouts/dashboard";
import { ChefListSearch } from "../../sections/dashboard/chef/chef-list-search";
import { ChefListTable } from "../../sections/dashboard/chef/chef-list-table";

const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      name: undefined,
      category: [],
      status: [],
      inStock: undefined,
    },
    page: 0,
    rowsPerPage: 5,
  });

  return {
    search,
    updateSearch: setSearch,
  };
};

const useChefs = (search) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    chefs: [],
    chefsCount: 0,
  });

  const getChefs = useCallback(async () => {
    try {
      const response = await chefsApi.getChefs(search);
      console.log(response);
      if (isMounted()) {
        setState({
          chefs: response.data,
          chefsCount: response.count,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [search, isMounted]);

  useEffect(
    () => {
      getChefs();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search]
  );

  return state;
};

const ChefList = () => {
  const { search, updateSearch } = useSearch();
  const { chefs, chefsCount } = useChefs(search);

  usePageView();

  const handleFiltersChange = useCallback(
    (filters) => {
      updateSearch((prevState) => ({
        ...prevState,
        filters,
      }));
    },
    [updateSearch]
  );

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
        <title>Chefs | HomeChef</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Chefs</Typography>
              </Stack>
            </Stack>
            <Card>
              <ChefListSearch onFiltersChange={handleFiltersChange} />
              <ChefListTable
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={search.page}
                chefs={chefs}
                chefsCount={chefsCount}
                rowsPerPage={search.rowsPerPage}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

ChefList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ChefList;

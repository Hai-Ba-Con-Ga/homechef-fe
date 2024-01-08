import {
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Stack,
  SvgIcon,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ChevronDownIcon from "@untitled-ui/icons-react/build/esm/ChevronDown";
import ChevronRightIcon from "@untitled-ui/icons-react/build/esm/ChevronRight";
import DotsHorizontalIcon from "@untitled-ui/icons-react/build/esm/DotsHorizontal";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
import numeral from "numeral";
import PropTypes from "prop-types";
import { Fragment, useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { Scrollbar } from "../../../components/scrollbar";
import { SeverityPill } from "../../../components/severity-pill";

const areaOptions = [
  {
    label: "District 1",
    value: "district1",
  },
  {
    label: "District 2",
    value: "district2",
  },
  {
    label: "District 3",
    value: "district3",
  },
  {
    label: "District 4",
    value: "district4",
  },
  {
    label: "District 5",
    value: "district5",
  },
  {
    label: "District 6",
    value: "district6",
  },
  {
    label: "District 7",
    value: "district7",
  },
  {
    label: "District 8",
    value: "district8",
  },
  {
    label: "District 9",
    value: "district9",
  },
  {
    label: "District 10",
    value: "district10",
  },
  {
    label: "District 11",
    value: "district11",
  },
  {
    label: "District 12",
    value: "district12",
  },
  {
    label: "Binh Thanh District",
    value: "binhthanhdistrict",
  },
  {
    label: "Go Vap District",
    value: "govapdistrict",
  },
  {
    label: "Phu Nhuan District",
    value: "phunhuandistrict",
  },
  {
    label: "Tan Binh District",
    value: "tanbinhdistrict",
  },
  {
    label: "Tan Phu District",
    value: "tanphudistrict",
  },
  {
    label: "Thu Duc District",
    value: "thuducdistrict",
  },
];

export const ChefListTable = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    chefs,
    chefsCount,
    rowsPerPage,
    ...other
  } = props;
  const [currentChef, setCurrentChef] = useState(null);

  const handleChefToggle = useCallback((chefId) => {
    setCurrentChef((prevchefId) => {
      if (prevchefId === chefId) {
        return null;
      }

      return chefId;
    });
  }, []);

  const handleChefClose = useCallback(() => {
    setCurrentChef(null);
  }, []);

  const handleChefUpdate = useCallback(() => {
    setCurrentChef(null);
    toast.success("chef updated");
  }, []);

  const handleChefDelete = useCallback(() => {
    toast.error("chef cannot be deleted");
  }, []);

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell width="25%">Name</TableCell>
              <TableCell width="25%">Stock</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>sku</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chefs.map((chef) => {
              const isCurrent = chef.id === currentChef;
              const price = numeral(chef.price).format(
                `${chef.currency}0,0.00`
              );
              const quantityColor = chef.quantity >= 10 ? "success" : "error";
              const statusColor =
                chef.status === "published" ? "success" : "info";
              const hasManyVariants = chef.variants > 1;

              return (
                <Fragment key={chef.id}>
                  <TableRow hover key={chef.id}>
                    <TableCell
                      padding="checkbox"
                      sx={{
                        ...(isCurrent && {
                          position: "relative",
                          "&:after": {
                            position: "absolute",
                            content: '" "',
                            top: 0,
                            left: 0,
                            backgroundColor: "primary.main",
                            width: 3,
                            height: "calc(100% + 1px)",
                          },
                        }),
                      }}
                      width="25%"
                    >
                      <IconButton onClick={() => handleChefToggle(chef.id)}>
                        <SvgIcon>
                          {isCurrent ? (
                            <ChevronDownIcon />
                          ) : (
                            <ChevronRightIcon />
                          )}
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                    <TableCell width="25%">
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {chef.image ? (
                          <Box
                            sx={{
                              alignItems: "center",
                              backgroundColor: "neutral.50",
                              backgroundImage: `url(${chef.image})`,
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                              borderRadius: 1,
                              display: "flex",
                              height: 80,
                              justifyContent: "center",
                              overflow: "hidden",
                              width: 80,
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              alignItems: "center",
                              backgroundColor: "neutral.50",
                              borderRadius: 1,
                              display: "flex",
                              height: 80,
                              justifyContent: "center",
                              width: 80,
                            }}
                          >
                            <SvgIcon>
                              <Image01Icon />
                            </SvgIcon>
                          </Box>
                        )}
                        <Box
                          sx={{
                            cursor: "pointer",
                            ml: 2,
                          }}
                        >
                          <Typography variant="subtitle2">
                            {chef.name}
                          </Typography>
                          <Typography color="text.secondary" variant="body2">
                            in {chef.category}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell width="25%">
                      <LinearProgress
                        value={chef.quantity}
                        variant="determinate"
                        color={quantityColor}
                        sx={{
                          height: 8,
                          width: 36,
                        }}
                      />
                      <Typography color="text.secondary" variant="body2">
                        {chef.quantity} in stock
                        {hasManyVariants && ` in ${chef.variants} variants`}
                      </Typography>
                    </TableCell>
                    <TableCell>{price}</TableCell>
                    <TableCell>{chef.sku}</TableCell>
                    <TableCell>
                      <SeverityPill color={statusColor}>
                        {chef.status}
                      </SeverityPill>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <SvgIcon>
                          <DotsHorizontalIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  {isCurrent && (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        sx={{
                          p: 0,
                          position: "relative",
                          "&:after": {
                            position: "absolute",
                            content: '" "',
                            top: 0,
                            left: 0,
                            backgroundColor: "primary.main",
                            width: 3,
                            height: "calc(100% + 1px)",
                          },
                        }}
                      >
                        <CardContent>
                          <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                              <Typography variant="h6">
                                Basic details
                              </Typography>
                              <Divider sx={{ my: 2 }} />
                              <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    defaultValue={chef.name}
                                    fullWidth
                                    label="Chef name"
                                    name="name"
                                  />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    defaultValue={chef.sku}
                                    disabled
                                    fullWidth
                                    label="SKU"
                                    name="sku"
                                  />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    defaultValue={chef.category}
                                    fullWidth
                                    label="Area"
                                    select
                                  >
                                    {areaOptions.map((option) => (
                                      <MenuItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    defaultValue={chef.id}
                                    disabled
                                    fullWidth
                                    label="Barcode"
                                    name="barcode"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Typography variant="h6">
                                Pricing and stocks
                              </Typography>
                              <Divider sx={{ my: 2 }} />
                              <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    defaultValue={chef.price}
                                    fullWidth
                                    label="Old price"
                                    name="old-price"
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          {chef.currency}
                                        </InputAdornment>
                                      ),
                                    }}
                                    type="number"
                                  />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                  <TextField
                                    defaultValue={chef.price}
                                    fullWidth
                                    label="New price"
                                    name="new-price"
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          $
                                        </InputAdornment>
                                      ),
                                    }}
                                    type="number"
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                  sx={{
                                    alignItems: "center",
                                    display: "flex",
                                  }}
                                >
                                  <Switch />
                                  <Typography variant="subtitle2">
                                    Keep selling when stock is empty
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                        <Divider />
                        <Stack
                          alignItems="center"
                          direction="row"
                          justifyContent="space-between"
                          sx={{ p: 2 }}
                        >
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                          >
                            <Button
                              onClick={handleChefUpdate}
                              type="submit"
                              variant="contained"
                            >
                              Update
                            </Button>
                            <Button color="inherit" onClick={handleChefClose}>
                              Cancel
                            </Button>
                          </Stack>
                          <div>
                            <Button onClick={handleChefDelete} color="error">
                              Delete Chef
                            </Button>
                          </div>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={chefsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

ChefListTable.propTypes = {
  chefs: PropTypes.array.isRequired,
  chefsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

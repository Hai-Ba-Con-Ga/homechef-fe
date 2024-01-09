import {
    Avatar,
    Card,
    IconButton,
    Stack,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import { format } from "date-fns";
import NextLink from "next/link";
import PropTypes from "prop-types";
import { Scrollbar } from "../../../components/scrollbar";
import { SeverityPill } from "../../../components/severity-pill";
import { paths } from "../../../paths";
import { getInitials } from "../../../utils/get-initials";

const groupVouchers = (vouchers) => {
  return vouchers.reduce(
    (acc, voucher) => {
      const { status } = voucher;

      return {
        ...acc,
        [status]: [...acc[status], voucher],
      };
    },
    {
      active: [],
      inactive: [],
    }
  );
};

const statusColorsMap = {
  inactive: "error",
  active: "success"
};

const VoucherRow = (props) => {
  const { voucher, ...other } = props;
  const status = voucher.isActive ? "active" : "inactive";

  const statusColor = statusColorsMap[status];
  const startDate =
    voucher.startDate && format(voucher.startDate, "dd/MM/yyyy");
  const endDate = voucher.endDate && format(voucher.endDate, "dd/MM/yyyy");

  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      {...other}
    >
      <TableCell width="25%">
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
          component={NextLink}
          href={paths.vouchers.details.replace(":voucherId", voucher.id)}
          sx={{
            display: "inline-flex",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          <Avatar
            sx={{
              height: 42,
              width: 42,
            }}
          >
            {getInitials(voucher.name)}
          </Avatar>
          <div>
            <Typography color="text.primary" variant="subtitle2">
              {voucher.code}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {voucher.name}
            </Typography>
          </div>
        </Stack>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">
          {voucher.quantity}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">Start Date</Typography>
        <Typography color="text.secondary" variant="body2">
          {startDate}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2">Due</Typography>
        <Typography color="text.secondary" variant="body2">
          {endDate}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <SeverityPill color={statusColor}>{status}</SeverityPill>
      </TableCell>
      <TableCell align="right">
        <IconButton
          component={NextLink}
          href={paths.vouchers.details.replace(":voucherId", voucher.id)}
        >
          <SvgIcon>
            <ArrowRightIcon />
          </SvgIcon>
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export const VoucherListTable = (props) => {
  const {
    group,
    vouchers,
    vouchersCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;

  let content;

  if (group) {
    const groupedVouchers = groupVouchers(vouchers);
    const statuses = Object.keys(groupedVouchers);

    content = (
      <Stack spacing={6}>
        {statuses.map((status) => {
          const groupTitle = status.charAt(0).toUpperCase() + status.slice(1);
          const count = groupedVouchers[status].length;
          const vouchers = groupedVouchers[status];
          const hasVouchers = vouchers.length > 0;

          return (
            <Stack key={groupTitle} spacing={2}>
              <Typography color="text.secondary" variant="h6">
                {groupTitle} ({count})
              </Typography>
              {hasVouchers && (
                <Card>
                  <Scrollbar>
                    <Table sx={{ minWidth: 600 }}>
                      <TableBody>
                        {vouchers.map((voucher) => (
                          <VoucherRow key={voucher.id} voucher={voucher} />
                        ))}
                      </TableBody>
                    </Table>
                  </Scrollbar>
                </Card>
              )}
            </Stack>
          );
        })}
      </Stack>
    );
  } else {
    content = (
      <Card>
        <Table>
          <TableBody>
            {vouchers.map((voucher) => (
              <VoucherRow key={voucher.id} voucher={voucher} />
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  }

  return (
    <Stack spacing={4} {...other}>
      {content}
      <TablePagination
        component="div"
        count={vouchersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Stack>
  );
};

VoucherListTable.propTypes = {
  group: PropTypes.bool,
  vouchers: PropTypes.array.isRequired,
  vouchersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

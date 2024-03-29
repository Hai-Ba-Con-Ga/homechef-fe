import PropTypes from "prop-types";
import { format } from "date-fns";
import numeral from "numeral";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import {
  Button,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { paths } from "../../../../paths";
import { PropertyList } from "../../../../components/property-list";
import { PropertyListItem } from "../../../../components/property-list-item";
import { SeverityPill } from "../../../../components/severity-pill";
import { Scrollbar } from "../../../../components/scrollbar";
import { ordersApi } from "@/api/orders";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const statusMap = {
  canceled: "warning",
  complete: "success",
  pending: "info",
  rejected: "error",
};
const transactionStatusMapping = {
  0: "pending",
  1: "completed",
  2: "rejected",
};

export const OrderDetails = (props) => {
  const { onApprove, onEdit, onReject, order } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const align = lgUp ? "horizontal" : "vertical";
  const items = order.items || [];
  const cookedTime = new Date(order.cookedTime);
  const createdAt = format(cookedTime, "dd/MM/yyyy HH:mm");
  const statusColor = statusMap[order.status];
  const totalAmount = numeral(order.totalPrice).format(`${order.currency}0,0`);

  //handle approve
  const handleApprove = async () => {
    await ordersApi.updateStatus(order.id, { status: 1 });
    await ordersApi.updateOrderStatus(order.id, { status: 1 });
    toast.success("Order approved");
    router.push(paths.orders.index);
  };
  const handleReject = async () => {
    await ordersApi.updateStatus(order.id, { status: 2 });
    await ordersApi.updateOrderStatus(order.id, { status: 2 });
    toast.success("Order rejected");
    router.push(paths.orders.index);
  };

  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Typography variant="h6">Details</Typography>
          <Button
            color="inherit"
            onClick={onEdit}
            size="small"
            startIcon={
              <SvgIcon>
                <Edit02Icon />
              </SvgIcon>
            }
          >
            Edit
          </Button>
        </Stack>
        <PropertyList>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="ID"
            value={order.id}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Quantity"
            value={order.quantity}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Customer"
          >
            <Typography color="text.secondary" variant="body2">
              {order.customer.fullName}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {order.customer.street}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {order.address.ward}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {order.address.district}
            </Typography>
          </PropertyListItem>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Date"
            value={createdAt}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Image"
            value={
              <a
                href={order.transaction[0].imageUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {order.id}
              </a>
            }
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Total Amount"
            value={totalAmount}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Transaction Status"
          >
            <SeverityPill color={statusColor}>
              {transactionStatusMapping[order.transaction[0].transactionStatus]}
            </SeverityPill>
          </PropertyListItem>
        </PropertyList>
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          justifyContent="flex-end"
          spacing={2}
        >
          {order.transaction[0].transactionStatus === 1 ? null : (
            <Button onClick={handleApprove} size="small" variant="contained">
              Approve
            </Button>
          )}

          {order.transaction[0].transactionStatus === 2 ? null : (
            <Button
              color="error"
              onClick={handleReject}
              size="small"
              variant="outlined"
            >
              Reject
            </Button>
          )}
        </Stack>
      </Stack>
      <Stack spacing={3}>
        <Typography variant="h6">Line items</Typography>
        <Scrollbar>
          <Table sx={{ minWidth: 400 }}>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Billing Cycle</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => {
                const unitAmount = numeral(item.unitAmount).format(
                  `${item.currency}0,0.00`
                );

                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.name} x {item.quantity}
                    </TableCell>
                    <TableCell>{item.billingCycle}</TableCell>
                    <TableCell>{unitAmount}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Scrollbar>
      </Stack>
    </Stack>
  );
};

OrderDetails.propTypes = {
  onApprove: PropTypes.func,
  onEdit: PropTypes.func,
  onReject: PropTypes.func,
  // @ts-ignore
  order: PropTypes.object,
};

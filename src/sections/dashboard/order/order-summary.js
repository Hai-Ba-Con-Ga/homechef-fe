import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Button,
  Card,
  CardHeader,
  Divider,
  Stack,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';
import { PropertyList } from '../../../components/property-list';
import { PropertyListItem } from '../../../components/property-list-item';

const statusOptions = ['Canceled', 'Complete', 'Rejected'];

export const OrderSummary = (props) => {
  const { order, ...other } = props;
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const [status, setStatus] = useState(statusOptions[0]);

  const handleChange = useCallback((event) => {
    setStatus(event.target.value);
  }, []);

  const align = mdUp ? 'horizontal' : 'vertical';
  const createdAt = format(order.createdAt, 'dd/MM/yyyy HH:mm');

  return (
    <Card {...other}>
      <CardHeader title="Basic info" />
      <Divider />
      <PropertyList>
        <PropertyListItem
          align={align}
          label="Customer"
        >
          <Typography variant="subtitle2">
            {order.customer.fullName}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {order.address.street}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {order.customer.ward}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {order.customer.district}
          </Typography>
        </PropertyListItem>
        <Divider />
        <PropertyListItem
          align={align}
          label="ID"
          value={order.id}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Quantity"
          value={order.quantity}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Date"
          value={order.cookedTime}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Promotion Code"
          value={order.promotionCode}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Total Amount"
          value={`${order.totalPrice}`}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Status"
        >
          <Stack
            alignItems={{
              xs: 'stretch',
              sm: 'center'
            }}
            direction={{
              xs: 'column',
              sm: 'row'
            }}
            spacing={1}
          >
            <TextField
              label="Status"
              margin="normal"
              name="status"
              onChange={handleChange}
              select
              SelectProps={{ native: true }}
              sx={{
                flexGrow: 1,
                minWidth: 150
              }}
              value={order.status}
            >
              {statusOptions.map((option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              ))}
            </TextField>
            <Button variant="contained">
              Save
            </Button>
          </Stack>
        </PropertyListItem>
      </PropertyList>
    </Card>
  );
};

OrderSummary.propTypes = {
  // @ts-ignore
  order: PropTypes.object.isRequired
};

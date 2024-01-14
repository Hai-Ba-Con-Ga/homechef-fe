import { customersApi } from "@/api/customers";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { paths } from "../../../paths";

import toast from "react-hot-toast";
export const CustomerDataManagement = (props) => {
  //call api delete customer
  const { customer, ...other } = props;

  const deleteCustomer = async () => {
    try {
      await customersApi.deleteCustomer({ customerId: customer.id });
      toast.success("Customer deleted");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };
  return (
    <Card {...other}>
      <CardHeader title="Data Management" />
      <CardContent sx={{ pt: 0 }}>
        <Button
          color="error"
          variant="outlined"
          onClick={deleteCustomer}
          href={paths.customers.index}
        >
          Delete Account
        </Button>
        <Box sx={{ mt: 1 }}>
          <Typography color="text.secondary" variant="body2">
            Remove this customer’s chart if he requested that, if not please be
            aware that what has been deleted can never brought back
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

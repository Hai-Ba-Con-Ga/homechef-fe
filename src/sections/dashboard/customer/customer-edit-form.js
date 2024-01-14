import { customersApi } from "@/api/customers";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Unstable_Grid2 as Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import NextLink from "next/link";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { paths } from "../../../paths";

export const CustomerEditForm = (props) => {
  const { customer, ...other } = props;
  const formik = useFormik({
    initialValues: {
      country: customer.country || "Vietnam",
      email: customer.email || "",
      hasDiscount: customer.hasDiscount || false,
      isVerified: customer.isVerified || false,
      fullName: customer.fullName || "",
      phone: customer.phone || "",
      state: customer.state || "Ho Chi Minh",
      submit: null,
    },
    validationSchema: Yup.object({
      country: Yup.string().max(255),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      hasDiscount: Yup.bool(),
      isVerified: Yup.bool(),
      fullName: Yup.string().max(255).required("Name is required"),
      phone: Yup.string().max(15),
      state: Yup.string().max(255),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await customersApi.updateCustomer(customer.id, values);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("Customer updated");
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card>
        <CardHeader title="Edit Customer" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.fullName && formik.errors.fullName)}
                fullWidth
                helperText={formik.touched.fullName && formik.errors.fullName}
                label="Full name"
                name="fullName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.fullName}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.email}
                InputProps={{ readOnly: true }} // This is the solution
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.country && formik.errors.country)}
                fullWidth
                helperText={formik.touched.country && formik.errors.country}
                label="Country"
                name="country"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.country}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.state && formik.errors.state)}
                fullWidth
                helperText={formik.touched.state && formik.errors.state}
                label="State/Region"
                name="state"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.state}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.phone && formik.errors.phone)}
                fullWidth
                helperText={formik.touched.phone && formik.errors.phone}
                label="Phone number"
                name="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
            </Grid>
          </Grid>
          <Stack divider={<Divider />} spacing={3} sx={{ mt: 3 }}>
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography gutterBottom variant="subtitle1">
                  Make Contact Info Public
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  Means that anyone viewing your profile will be able to see
                  your contacts details
                </Typography>
              </Stack>
              <Switch
                checked={formik.values.isVerified}
                color="primary"
                edge="start"
                name="isVerified"
                onChange={formik.handleChange}
                value={formik.values.isVerified}
              />
            </Stack>
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography gutterBottom variant="subtitle1">
                  Available to hire
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  Toggling this will let your teammates know that you are
                  available for acquiring new projects
                </Typography>
              </Stack>
              <Switch
                checked={formik.values.hasDiscount}
                color="primary"
                edge="start"
                name="hasDiscount"
                onChange={formik.handleChange}
                value={formik.values.hasDiscount}
              />
            </Stack>
          </Stack>
        </CardContent>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          flexWrap="wrap"
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            Update
          </Button>
          <Button
            color="inherit"
            component={NextLink}
            disabled={formik.isSubmitting}
            href={paths.customers.details.replace(":customerId", customer.id)}
          >
            Cancel
          </Button>
        </Stack>
      </Card>
    </form>
  );
};

CustomerEditForm.propTypes = {
  // @ts-ignore
  customer: PropTypes.object.isRequired,
};

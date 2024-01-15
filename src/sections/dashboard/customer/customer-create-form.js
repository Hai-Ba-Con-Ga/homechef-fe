import { customersApi } from "@/api/customers";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Unstable_Grid2 as Grid,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import NextLink from "next/link";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { paths } from "../../../paths";

export const CustomerCreateForm = (props) => {
  const { ...other } = props;
  const formik = useFormik({
    initialValues: {
      country: "Vietnam",
      email: "",
      hasDiscount: false,
      isVerified: false,
      fullName: "",
      phone: "",
      state: "Ho Chi Minh",
      submit: null,
      avatarUrl: null,
      role: 1,
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
        await customersApi.createCustomer(values);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("Customer created");
        //wait 1s to show toast
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Navigate to customers page
        window.location.href = paths.customers.index;
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
        <CardHeader title="Create Customer" />
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
            Create
          </Button>
          <Button
            color="inherit"
            component={NextLink}
            disabled={formik.isSubmitting}
            href={paths.customers.index}
          >
            Cancel
          </Button>
        </Stack>
      </Card>
    </form>
  );
};

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Unstable_Grid2 as Grid,
  Stack,
  TextField,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import NextLink from "next/link";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { vouchersApi } from "../../../api/vouchers";
import { format } from "date-fns";
import { useCallback, useState } from "react";
import { paths } from "../../../paths";
import { useRouter } from "next/navigation";

export const VoucherEditForm = (props) => {
  const { voucher, ...other } = props;
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date("2022-09-22T11:41:50"));
  const [endDate, setEndDate] = useState(new Date("2023-01-11T12:41:50"));

  const handleStartDateChange = useCallback((date) => {
    setStartDate(date);
  }, []);

  const handleEndDateChange = useCallback((date) => {
    setEndDate(date);
  }, []);
  const formik = useFormik({
    initialValues: {
      name: voucher.name || "",
      code: voucher.code || "",
      quantity: voucher.quantity || "",
      value: voucher.value || "",
      startDate: startDate,
      endDate: endDate,
      discountType: 0,
      status: 0,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().max(255).required("Voucher Name is required"),
      code: Yup.string().max(255).required("Voucher Code is required"),
      quantity: Yup.number().required("Quantity is required"),
      value: Yup.number().required("Value is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        await vouchersApi.updateVoucher(voucher.id, values);
        toast.success("Voucher updated");
        router.push(paths.vouchers.index);
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
        <CardHeader title="Edit Voucher" />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Voucher Name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.name}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.code && formik.errors.code)}
                fullWidth
                helperText={formik.touched.code && formik.errors.code}
                label="Voucher Code"
                name="code"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.code}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Voucher Quantity"
                name="quantity"
                type="number"
                error={!!(formik.touched.quantity && formik.errors.quantity)}
                helperText={formik.touched.quantity && formik.errors.quantity}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.quantity}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Voucher Value"
                name="value"
                type="number"
                error={!!(formik.touched.value && formik.errors.value)}
                helperText={formik.touched.value && formik.errors.value}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.value}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <MobileDatePicker
                label="Start Date"
                inputFormat="MM/dd/yyyy"
                value={formik.values.startDate}
                name="startDate"
                onChange={handleStartDateChange}
                renderInput={(inputProps) => <TextField {...inputProps} />}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <MobileDatePicker
                label="End Date"
                inputFormat="MM/dd/yyyy"
                value={formik.values.endDate}
                name="endDate"
                onChange={handleEndDateChange}
                renderInput={(inputProps) => <TextField {...inputProps} />}
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
            Update
          </Button>
          <Button
            color="inherit"
            component={NextLink}
            disabled={formik.isSubmitting}
            href={paths.vouchers.index}
          >
            Cancel
          </Button>
        </Stack>
      </Card>
    </form>
  );
};

VoucherEditForm.propTypes = {
  // @ts-ignore
  voucher: PropTypes.object.isRequired,
};

import { vouchersApi } from "@/api/vouchers";
import { Button, Stack, SvgIcon, TextField, Typography } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import { useFormik } from "formik";

import * as Yup from "yup";

export const VoucherDetailsStep = (props) => {
  const { onBack, onNext, ...other } = props;
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
      name: "",
      code: "",
      quantity: "",
      startDate: startDate,
      endDate: endDate,
      discountType: 0,
      status: 0,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().max(255).required("Voucher Name is required"),
      code: Yup.string().max(255).required("Voucher Code is required"),
      quantity: Yup.number().required("Quantity is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        await vouchersApi.createVoucher(values);
        //forwards to next step
        onNext();
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
      <Stack spacing={3}>
        <Stack spacing={3}>
          <TextField
            error={!!(formik.touched.name && formik.errors.name)}
            fullWidth
            helperText={formik.touched.name && formik.errors.name}
            label="Voucher name"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            required
            value={formik.values.name}
          />
          <TextField
            fullWidth
            label="Voucher Code"
            name="code"
            placeholder="e.g Salesforce Analyst"
            error={!!(formik.touched.code && formik.errors.code)}
            helperText={formik.touched.code && formik.errors.code}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.code}
          />
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
        </Stack>
        <div>
          <Typography variant="h6">When is the voucher starting?</Typography>
        </div>
        <Stack alignItems="center" direction="row" spacing={3}>
          <MobileDatePicker
            label="Start Date"
            inputFormat="MM/dd/yyyy"
            value={formik.values.startDate}
            name="startDate"
            onChange={handleStartDateChange}
            renderInput={(inputProps) => <TextField {...inputProps} />}
          />
          <MobileDatePicker
            label="End Date"
            inputFormat="MM/dd/yyyy"
            value={formik.values.endDate}
            name="endDate"
            onChange={handleEndDateChange}
            renderInput={(inputProps) => <TextField {...inputProps} />}
          />
        </Stack>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Button
            endIcon={
              <SvgIcon>
                <ArrowRightIcon />
              </SvgIcon>
            }
            // onClick={onNext}
            type="submit"
            variant="contained"
          >
            Continue
          </Button>
          <Button color="inherit" onClick={onBack}>
            Back
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

VoucherDetailsStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
};

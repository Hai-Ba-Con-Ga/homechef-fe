import { Button, Stack, SvgIcon, TextField, Typography } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";

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

  return (
    <Stack spacing={3} {...other}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Voucher Name"
          name="voucherName"
          placeholder="e.g Salesforce Analyst"
        />
        <TextField
          fullWidth
          label="Voucher Code"
          name="voucherDescription"
          placeholder="e.g Salesforce Analyst"
        />
        <TextField
          fullWidth
          label="Voucher Quantity"
          name="quantity"
          type="number"
        />
      </Stack>
      <div>
        <Typography variant="h6">When is the voucher starting?</Typography>
      </div>
      <Stack alignItems="center" direction="row" spacing={3}>
        <MobileDatePicker
          label="Start Date"
          inputFormat="MM/dd/yyyy"
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(inputProps) => <TextField {...inputProps} />}
        />
        <MobileDatePicker
          label="End Date"
          inputFormat="MM/dd/yyyy"
          value={endDate}
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
          onClick={onNext}
          variant="contained"
        >
          Continue
        </Button>
        <Button color="inherit" onClick={onBack}>
          Back
        </Button>
      </Stack>
    </Stack>
  );
};

VoucherDetailsStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
};

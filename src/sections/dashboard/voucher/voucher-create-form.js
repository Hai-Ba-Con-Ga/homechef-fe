import { paths } from "@/paths";
import {
  Avatar,
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  SvgIcon,
  Typography,
} from "@mui/material";
import CheckIcon from "@untitled-ui/icons-react/build/esm/Check";
import NextLink from "next/link";
import { useCallback, useMemo, useState } from "react";
import { VoucherDetailsStep } from "./voucher-details-step";
import { VoucherTypeStep } from "./voucher-type-step";

const StepIcon = (props) => {
  const { active, completed, icon } = props;

  const highlight = active || completed;

  return (
    <Avatar
      sx={{
        height: 40,
        width: 40,
        ...(highlight && {
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        }),
      }}
      variant="rounded"
    >
      {completed ? (
        <SvgIcon>
          <CheckIcon />
        </SvgIcon>
      ) : (
        icon
      )}
    </Avatar>
  );
};

export const VoucherCreateForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [complete, setComplete] = useState(false);

  const handleNext = useCallback(() => {
    setActiveStep((prevState) => prevState + 1);
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep((prevState) => prevState - 1);
  }, []);

  const handleComplete = useCallback(() => {
    setComplete(true);
  }, []);

  const steps = useMemo(() => {
    return [
      {
        label: "Type",
        content: <VoucherTypeStep onBack={handleBack} onNext={handleNext} />,
      },
      {
        label: "Details",
        content: (
          <VoucherDetailsStep onBack={handleBack} onNext={handleComplete} />
        ),
      },
    ];
  }, [handleBack, handleNext, handleComplete]);

  if (complete) {
    return (
      <div>
        <Typography color="text.primary" variant="h5">
          All done!
        </Typography>
        {/* back to voucher */}
        <Button href={paths.vouchers.index} component={NextLink}>
          Back to Voucher
        </Button>
      </div>
    );
  }
  return (
    <Stepper
      activeStep={activeStep}
      orientation="vertical"
      sx={{
        "& .MuiStepConnector-line": {
          borderLeftColor: "divider",
          borderLeftWidth: 2,
          ml: 1,
        },
      }}
    >
      {steps.map((step, index) => {
        const isCurrentStep = activeStep === index;

        return (
          <Step key={step.label}>
            <StepLabel StepIconComponent={StepIcon}>
              <Typography sx={{ ml: 2 }} variant="overline">
                {step.label}
              </Typography>
            </StepLabel>
            <StepContent
              sx={{
                borderLeftColor: "divider",
                borderLeftWidth: 2,
                ml: "20px",
                ...(isCurrentStep && {
                  py: 4,
                }),
              }}
            >
              {step.content}
            </StepContent>
          </Step>
        );
      })}
    </Stepper>
  );
};

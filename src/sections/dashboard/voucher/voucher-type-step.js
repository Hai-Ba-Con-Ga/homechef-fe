import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import { Button, Card, Radio, Stack, SvgIcon, Typography } from "@mui/material";

const typeOptions = [
  {
    description: "One-time projects with a defined scope of work",
    title: "Cash",
    value: "case",
  },
  {
    description: "Limited-time projects with highly experienced individuals",
    title: "Percent",
    value: "percent",
  },
];

export const VoucherTypeStep = (props) => {
  const { onBack, onNext, ...other } = props;
  const [type, setType] = useState(typeOptions[1].value);

  const handleTypeChange = useCallback((type) => {
    setType(type);
  }, []);

  return (
    <Stack spacing={3} {...other}>
      <div>
        <Typography variant="h6">I’m looking for...</Typography>
      </div>
      <Stack spacing={2}>
        {typeOptions.map((option) => (
          <Card
            key={option.value}
            sx={{
              alignItems: "center",
              cursor: "pointer",
              display: "flex",
              p: 2,
              ...(type === option.value && {
                backgroundColor: "primary.alpha12",
                boxShadow: (theme) => `${theme.palette.primary.main} 0 0 0 1px`,
              }),
            }}
            onClick={() => handleTypeChange(option.value)}
            variant="outlined"
          >
            <Stack direction="row" spacing={2}>
              <Radio checked={type === option.value} color="primary" />
              <div>
                <Typography variant="subtitle1">{option.title}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {option.description}
                </Typography>
              </div>
            </Stack>
          </Card>
        ))}
      </Stack>
      <div>
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
      </div>
    </Stack>
  );
};

VoucherTypeStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
};

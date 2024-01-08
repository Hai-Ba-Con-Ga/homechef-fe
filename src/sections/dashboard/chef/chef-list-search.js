import { useCallback, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import {
  Box,
  Chip,
  Divider,
  Input,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { MultiSelect } from "../../../components/multi-select";
import { useUpdateEffect } from "../../../hooks/use-update-effect";

const areaOptions = [
  {
    label: "District 1",
    value: "district1",
  },
  {
    label: "District 2",
    value: "district2",
  },
  {
    label: "District 3",
    value: "district3",
  },
  {
    label: "District 4",
    value: "district4",
  },
  {
    label: "District 5",
    value: "district5",
  },
  {
    label: "District 6",
    value: "district6",
  },
  {
    label: "District 7",
    value: "district7",
  },
  {
    label: "District 8",
    value: "district8",
  },
  {
    label: "District 9",
    value: "district9",
  },
  {
    label: "District 10",
    value: "district10",
  },
  {
    label: "District 11",
    value: "district11",
  },
  {
    label: "District 12",
    value: "district12",
  },
  {
    label: "Binh Thanh District",
    value: "binhthanhdistrict",
  },
  {
    label: "Go Vap District",
    value: "govapdistrict",
  },
  {
    label: "Phu Nhuan District",
    value: "phunhuandistrict",
  },
  {
    label: "Tan Binh District",
    value: "tanbinhdistrict",
  },
  {
    label: "Tan Phu District",
    value: "tanphudistrict",
  },
  {
    label: "Thu Duc District",
    value: "thuducdistrict",
  },
];

const statusOptions = [
  {
    label: "Published",
    value: "published",
  },
  {
    label: "Draft",
    value: "draft",
  },
];

export const ChefListSearch = (props) => {
  const { onFiltersChange, ...other } = props;
  const queryRef = useRef(null);
  const [query, setQuery] = useState("");
  const [chips, setChips] = useState([]);

  const handleChipsUpdate = useCallback(() => {
    const filters = {
      name: undefined,
      area: [],
      status: [],
    };

    chips.forEach((chip) => {
      switch (chip.field) {
        case "name":
          // There will (or should) be only one chips with field "name"
          // so we can set up it directly
          filters.name = chip.value;
          break;
        case "area":
          filters.area.push(chip.value);
          break;
        case "status":
          filters.status.push(chip.value);
          break;
        default:
          break;
      }
    });

    onFiltersChange?.(filters);
  }, [chips, onFiltersChange]);

  useUpdateEffect(() => {
    handleChipsUpdate();
  }, [chips, handleChipsUpdate]);

  const handleChipDelete = useCallback((deletedChip) => {
    setChips((prevChips) => {
      return prevChips.filter((chip) => {
        // There can exist multiple chips for the same field.
        // Filter them by value.

        return !(
          deletedChip.field === chip.field && deletedChip.value === chip.value
        );
      });
    });
  }, []);

  const handleQueryChange = useCallback((event) => {
    event.preventDefault();
    setQuery(queryRef.current?.value || "");
  }, []);

  const handleAreaChange = useCallback((values) => {
    setChips((prevChips) => {
      const valuesFound = [];

      // First cleanup the previous chips
      const newChips = prevChips.filter((chip) => {
        if (chip.field !== "area") {
          return true;
        }

        const found = values.includes(chip.value);

        if (found) {
          valuesFound.push(chip.value);
        }

        return found;
      });

      // Nothing changed
      if (values.length === valuesFound.length) {
        return newChips;
      }

      values.forEach((value) => {
        if (!valuesFound.includes(value)) {
          const option = areaOptions.find((option) => option.value === value);

          newChips.push({
            label: "Area",
            field: "area",
            value,
            displayValue: option.label,
          });
        }
      });

      return newChips;
    });
  }, []);

  const handleStatusChange = useCallback((values) => {
    setChips((prevChips) => {
      const valuesFound = [];

      // First cleanup the previous chips
      const newChips = prevChips.filter((chip) => {
        if (chip.field !== "status") {
          return true;
        }

        const found = values.includes(chip.value);

        if (found) {
          valuesFound.push(chip.value);
        }

        return found;
      });

      // Nothing changed
      if (values.length === valuesFound.length) {
        return newChips;
      }

      values.forEach((value) => {
        if (!valuesFound.includes(value)) {
          const option = statusOptions.find((option) => option.value === value);

          newChips.push({
            label: "Status",
            field: "status",
            value,
            displayValue: option.label,
          });
        }
      });

      return newChips;
    });
  }, []);

  // We memoize this part to prevent re-render issues
  const areaValues = useMemo(
    () =>
      chips.filter((chip) => chip.field === "area").map((chip) => chip.value),
    [chips]
  );

  const statusValues = useMemo(
    () =>
      chips.filter((chip) => chip.field === "status").map((chip) => chip.value),
    [chips]
  );

  const showChips = chips.length > 0;

  return (
    <div {...other}>
      <Stack
        alignItems="center"
        component="form"
        direction="row"
        onSubmit={handleQueryChange}
        spacing={2}
        sx={{ p: 2 }}
      >
        <SvgIcon>
          <SearchMdIcon />
        </SvgIcon>
        <Input
          disableUnderline
          fullWidth
          inputProps={{ ref: queryRef }}
          placeholder="Search"
          sx={{ flexGrow: 1 }}
          value={query}
        />
      </Stack>
      <Divider />
      {showChips ? (
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          gap={1}
          sx={{ p: 2 }}
        >
          {chips.map((chip, index) => (
            <Chip
              key={index}
              label={
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    "& span": {
                      fontWeight: 600,
                    },
                  }}
                >
                  <>
                    <span>{chip.label}</span>: {chip.displayValue || chip.value}
                  </>
                </Box>
              }
              onDelete={() => handleChipDelete(chip)}
              variant="outlined"
            />
          ))}
        </Stack>
      ) : (
        <Box sx={{ p: 2.5 }}>
          <Typography color="text.secondary" variant="subtitle2">
            No filters applied
          </Typography>
        </Box>
      )}
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        spacing={1}
        sx={{ p: 1 }}
      >
        <MultiSelect
          label="Area"
          onChange={handleAreaChange}
          options={areaOptions}
          value={areaValues}
        />
        <MultiSelect
          label="Status"
          onChange={handleStatusChange}
          options={statusOptions}
          value={statusValues}
        />
      </Stack>
    </div>
  );
};

ChefListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
};

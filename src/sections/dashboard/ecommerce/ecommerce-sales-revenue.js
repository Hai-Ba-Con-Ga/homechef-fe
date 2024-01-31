import { Card, CardContent, CardHeader, TextField, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { format, subDays } from "date-fns";
import { Chart } from "../../../components/chart";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useUpdateEffect } from "@/hooks/use-update-effect";

const now = new Date();

const createCategories = (sortBy) => {
  var categories = [];
  if (sortBy === "week") {
    categories = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  } else if (sortBy === "month") {
    categories = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  }
  return categories;
};

const useChartOptions = (sortBy) => {
  const theme = useTheme();
  const categories = createCategories(sortBy);

  return {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: [theme.palette.primary.main, theme.palette.warning.main],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: "solid",
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      horizontalAlign: "right",
      labels: {
        colors: theme.palette.text.secondary,
      },
      position: "top",
      show: true,
    },
    markers: {
      hover: {
        size: undefined,
        sizeOffset: 2,
      },
      radius: 2,
      shape: "circle",
      size: 4,
      strokeWidth: 0,
    },
    stroke: {
      curve: "smooth",
      dashArray: [0, 3],
      lineCap: "butt",
      width: 3,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories,
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: [
      {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
      },
      {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
      },
    ],
  };
};

const charts = [
  {
    label: "week",
    value: {
      chartSeries: [
        {
          name: "Week",
          data: [3, 4, 7, 3, 2, 4, 7, 10],
        },
      ],
    },
  },
  {
    label: "month",
    value: {
      chartSeries: [
        {
          name: "Month",
          data: [2, 5, 3, 7, 3, 4, 7, 10, 2, 5, 3, 7],
        },
      ],
    },
  },
];

const sortOptions = [
  {
    label: "Last week",
    value: "week",
  },
  {
    label: "Last month",
    value: "month",
  },
];

export const EcommerceSalesRevenue = (props) => {
  // const { chartSeries } = props;

  const [sortBy1, setSortBy1] = useState("week");
  const chartOptions = useChartOptions(sortBy1);
  const { onFiltersChange, onSortChange, sortBy } = props;
  const [filters, setFilters] = useState({});
  const [chartSeries, setChartSeries] = useState([]);

  const handleFiltersUpdate = useCallback(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  //handle change chart

  const handleSortChange = useCallback(
    (event) => {
      const sortBy = event.target.value;
      setSortBy1(sortBy);
      onSortChange?.({ sortBy });
    },
    [onSortChange]
  );

  useEffect(() => {
    console.log(sortBy1);
    const chart =
      charts.find((item) => item.label == sortBy1)?.value.chartSeries || [];
    setChartSeries(chart);
  }, [sortBy1]);

  useUpdateEffect(() => {
    handleFiltersUpdate();
  }, [filters, onFiltersChange]);

  return (
    <Card>
      <Stack direction="row" justifyContent="space-between" sx={{ p: 3 }}>
        <CardHeader title="Orders" />
        <TextField
          label="Sort By"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </Stack>

      <CardContent sx={{ pt: 0 }}>
        <Chart
          height={320}
          options={chartOptions}
          series={chartSeries}
          type="line"
        />
      </CardContent>
    </Card>
  );
};

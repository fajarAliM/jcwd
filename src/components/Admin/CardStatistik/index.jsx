import {
  Box,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const CardStatistik = ({
  column,
  cardTitle,
  cardCaption,
  selectHandle,
  selectValue,
  chartSort = [],
  chartOption,
  chartSeries,
  chartHeight,
  chartType,
}) => {
  return (
    <Grid item xs={column} sx={{ marginTop: "16px" }}>
      <Box
        sx={{
          paddingX: "16px",
          paddingY: "32px",
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 2,
          height: "100%",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
              {cardTitle}
            </Typography>

            <Typography sx={{ fontSize: "12px", color: "Sidebar.500" }}>
              {cardCaption}
            </Typography>
          </Box>
          <FormControl>
            <Select
              sx={{ width: "141px", height: "24px" }}
              onChange={selectHandle}
              value={selectValue}
            >
              {chartSort.map((val) => {
                return (
                  <MenuItem value={val.sortValue}>{val.sortTitle}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Chart
          height={chartHeight}
          options={chartOption}
          series={chartSeries}
          type={chartType}
        />
      </Box>
    </Grid>
  );
};

export default CardStatistik;

import { FC } from "react";
import Chart from "react-apexcharts";
import { useStoreState } from "../store/chartDataStore";
import { Box } from "@chakra-ui/react";

export const Visualization: FC = () => {
  const data = useStoreState("data");
  const configuration = {
    options: {
      chart: {
        id: "prey-and-predators",
      },
    },
    series: [
      {
        name: "Predators",
        data: data.map((e) => e.predators),
      },
      {
        name: "Preys",
        data: data.map((e) => e.preys),
      },
    ],
  };

  return (
    <Box>
      <Chart
        options={configuration.options}
        series={configuration.series}
      ></Chart>
    </Box>
  );
};

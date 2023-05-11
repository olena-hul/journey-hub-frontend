<template>
  <Bar id="trip-days-chart" :options="chartOptions" :data="chartData" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
ChartJS.defaults.font.family = "Montserrat";
ChartJS.defaults.scales.linear.min = 0;

export default defineComponent({
  name: "trip-days-chart",
  extends: Bar,
  components: { Bar },
  props: {
    daysInTrips: Array,
  },
  computed: {
    chartData(): any {
      return {
        labels: [
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
        ],
        datasets: [
          {
            label: "Days in trips by months",
            backgroundColor: "#78a983",
            data: this.daysInTrips,
          },
        ],
      };
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
      },
      options: {
        animations: {
          tension: {
            duration: 1000,
            easing: "linear",
            from: 1,
            to: 0,
            loop: true,
          },
        },
      },
    };
  },
});
</script>

<style scoped></style>

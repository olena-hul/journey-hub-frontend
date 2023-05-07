<template>
  <Doughnut
    id="trip-expenses-chart"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import { BUDGET_CATEGORIES } from "@/common/constants";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);
ChartJS.defaults.font.family = "Montserrat";
ChartJS.defaults.scales.linear.min = 0;

export default defineComponent({
  name: "total-expenses-chart",
  extends: Doughnut,
  components: { Doughnut },
  props: {
    expenses: Array,
  },
  computed: {
    chartData(): any {
      return {
        labels: BUDGET_CATEGORIES,
        datasets: [
          {
            label: "Total expenses in your trips",
            data: this.expenses,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#367443",
              "#874854",
              "#934784",
            ],
          },
        ],
      };
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: "right",
          },
        },
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

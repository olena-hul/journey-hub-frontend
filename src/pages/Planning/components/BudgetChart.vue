<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
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
import { BUDGET_CATEGORIES } from "@/common/constants";

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
  name: "budget-chart",
  extends: Bar,
  components: { Bar },
  props: {
    estimatedExpenses: Array,
    actualExpenses: Array,
  },
  computed: {
    chartData(): any {
      return {
        labels: BUDGET_CATEGORIES,
        datasets: [
          {
            label: "Estimated expenses",
            backgroundColor: "#78a983",
            data: this.estimatedExpenses,
          },
          {
            label: "Actual expenses to spend",
            backgroundColor: "#CAE9CF",
            data: this.actualExpenses,
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

<script setup lang="ts">
import type { CustomExpense } from "@/pages/Profile/api";
import { formatDateDDMM } from "@/pages/Planning/utils";

interface Props {
  customExpense: CustomExpense;
}

defineProps<Props>();
</script>

<script lang="ts">
import { defineComponent } from "vue";
import Price from "@/assets/images/price-tag.png";
import RemoveIcon from "@/assets/images/cross.png";
import { useTripsStore } from "@/pages/Profile/store/trips";

export default defineComponent({
  name: "CustomExpense",
  data() {
    return {
      Price,
      tripsStore: useTripsStore(),
      expense: this.customExpense,
    };
  },
  methods: {
    onExpenseRemove(id: number) {
      this.tripsStore.customExpenseRemove(id);
    },
  },
});
</script>

<template>
  <div class="profile-custom-expenses-card">
    <span class="profile-custom-expenses-card-title"
      >{{ customExpense.attraction.name }} ({{
        formatDateDDMM(customExpense.date)
      }})</span
    >

    <div class="planning-daily-activity-card-center-details">
      <span class="profile-custom-expenses-card-category">
        {{ customExpense.budget_category }}
      </span>
      <img :src="Price" alt="price icon" />
      <span>
        {{ customExpense.price }}
        {{ customExpense.currency }}</span
      >
    </div>
    <p class="profile-custom-expenses-card-description">
      {{ customExpense.description }}
    </p>
    <img
      @click="() => onExpenseRemove(customExpense.id)"
      :src="RemoveIcon"
      class="planning-daily-activity-remove"
      alt="Remove icon"
    />
  </div>
</template>

<style scoped></style>

<template>
  <VueDatePicker
    ref="internalRef"
    v-model="internalVal"
    range
    multi-calendars
    format="dd, MMM"
  >
    <template #input-icon>
      <img :src="Calendar" alt="Calendar icon" class="icon" />
    </template>
    <template #dp-input="{ value }">
      <span :class="value ? 'value' : 'placeholder'">{{
        value ? value : "Select date"
      }}</span>
    </template>
  </VueDatePicker>
</template>

<script lang="ts">
import "./index.scss";
import { defineComponent, ref } from "vue";
import Calendar from "@/assets/images/Calendar.svg";

const internalRef = ref();

export default defineComponent({
  name: "date-picker",
  props: {
    date: Object,
  },
  data: () => ({
    internalRef,
    Calendar,
    modelValue: Date,
  }),
  computed: {
    internalVal: {
      get() {
        return this.modelValue;
      },
      set(val: string) {
        this.$emit("update:modelValue", val);
      },
    },
  },
});
</script>

<style scoped></style>

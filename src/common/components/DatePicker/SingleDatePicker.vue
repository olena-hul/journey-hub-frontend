<template>
  <div class="wide-date-picker">
    <VueDatePicker ref="internalRef" v-model="internalVal" format="dd, MMM">
      <template #input-icon>
        <img :src="Calendar" alt="Calendar icon" class="icon" />
      </template>
      <template #dp-input="{ value }">
        <span :class="className ? className : ''">{{
          value ? value : "Select date"
        }}</span>
      </template>
    </VueDatePicker>
  </div>
</template>

<script lang="ts">
import "./index.scss";
import { defineComponent, ref } from "vue";
import Calendar from "@/assets/images/Calendar.svg";

const internalRef = ref();

export default defineComponent({
  name: "single-date-picker",
  props: {
    date: Object,
    className: {
      required: false,
    },
    modelValue: Object,
  },
  data: () => ({
    internalRef,
    Calendar,
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

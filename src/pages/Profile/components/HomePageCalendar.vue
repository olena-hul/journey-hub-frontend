<template>
  <VueDatePicker
    ref="internalRef"
    v-model="internalVal"
    range
    format="dd, MMM"
    v-bind="$props"
  >
  </VueDatePicker>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Calendar from "@/assets/images/Calendar.svg";

const internalRef = ref();

export default defineComponent({
  name: "home-page-calendar",
  props: {
    date: Object,
    className: {
      required: false,
    },
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

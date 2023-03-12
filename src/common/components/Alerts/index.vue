<template>
  <div v-if="show">
    <div :class="['alert', `alert-${type}`]">
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts">
import "./index.scss";
import { defineComponent } from "vue";

export default defineComponent({
  name: "alert-component",
  props: {
    type: {
      type: String,
      default: "info",
      validator: (value: string) =>
        ["info", "success", "warning", "danger"].includes(value),
    },
    message: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    dismiss() {
      this.show = false;
    },
  },
});
</script>

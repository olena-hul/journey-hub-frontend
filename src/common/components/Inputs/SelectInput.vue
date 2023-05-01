<template>
  <label class="inputs-label">
    {{ labelText }}
    <FormKit
      type="select"
      v-bind="inputProps"
      input-class="inputs-select"
      messages-class="inputs-messages"
      v-model="inputVal"
      :options="options"
    />
  </label>
</template>

<script lang="ts">
import "./index.scss";
import Sms from "@/assets/images/sms.svg";
import { FormKit } from "@formkit/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "select-input",
  components: {
    FormKit,
  },
  props: {
    labelText: String,
    inputProps: Object,
    modelValue: String,
    options: Array,
  },
  data: () => ({
    Sms,
  }),
  computed: {
    inputVal: {
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

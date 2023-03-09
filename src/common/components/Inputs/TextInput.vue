<template>
  <label class="inputs-label">
    {{ labelText }}
    <FormKit
      v-bind="inputProps"
      input-class="inputs-text"
      messages-class="inputs-messages"
      v-model="inputVal"
    />
  </label>
</template>

<script lang="ts">
import "./index.scss";
import Sms from "@/assets/images/sms.svg";
import { FormKit } from "@formkit/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "text-input",
  components: {
    FormKit,
  },
  props: {
    labelText: String,
    inputProps: Object,
    modelValue: String,
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

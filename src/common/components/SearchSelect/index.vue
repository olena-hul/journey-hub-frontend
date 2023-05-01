<!-- Vue component -->
<template>
  <div>
    <VueMultiselect
      v-model="internalVal"
      :options="options"
      placeholder="Select location"
      select-label=""
      deselectLabel=""
      :track-by="trackBy"
      label="name"
      :customLabel="customLabel"
    >
    </VueMultiselect>
  </div>
</template>

<script lang="ts">
import "./index.scss";
import VueMultiselect from "vue-multiselect";
import { defineComponent } from "vue";

export default defineComponent({
  name: "search-select",
  components: { VueMultiselect },
  props: {
    options: Array,
    customLabel: {
      required: false,
      type: Function,
    },
    trackBy: {
      required: false,
      type: String,
    },
    modelValue: Object,
  },
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

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<script lang="ts">
import { defineComponent } from "vue";
import "./index.scss";
import FileIcon from "@/assets/images/file.png";
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";

export default defineComponent({
  name: "file-input",
  components: { PrimaryButton },
  props: {
    labelText: String,
    inputProps: Object,
    modelValue: String,
    handleFileChosen: Function,
  },
  data: () => ({
    FileIcon,
  }),
  methods: {
    browseFiles() {
      document.getElementById("file-upload").click();
    },
  },
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

<template>
  <label for="file-upload" class="inputs-file">
    <input
      id="file-upload"
      type="file"
      style="display: none"
      :onchange="(e) => this.handleFileChosen(e)"
    />
    <PrimaryButton @click="browseFiles"> Upload photo</PrimaryButton>
  </label>
</template>

<style scoped></style>

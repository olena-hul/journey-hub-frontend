<template>
  <div class="planning-loader">
    <h2>Your trip is saving</h2>
    <spinner color="#78A983FF" size="70" depth="10" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Spinner from "vue-spinner-component/src/Spinner.vue";

export default defineComponent({
  name: "trip-loader",
  components: { Spinner },
});
</script>

<style scoped></style>

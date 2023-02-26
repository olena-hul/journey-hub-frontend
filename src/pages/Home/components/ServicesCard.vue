<template>
  <div class="home-services-card">
    <img :src="image" alt="Send icon" />
    <span class="home-services-card-title">{{ title }}</span>
    <span class="home-services-card-content">{{ content }} </span>
  </div>
</template>
<script lang="ts">
export default {
  name: "services-card",
  props: {
    image: String,
    title: String,
    content: String,
  },
};
</script>

<style scoped></style>

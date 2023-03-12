<template>
  Welcome!
  <PrimaryButton :on-click="signOut" type="submit"> Sign Out </PrimaryButton>
</template>

<script>
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";
import { defineComponent } from "vue";
import { useAuthStore } from "@/pages/Home/store/auth";

export default defineComponent({
  name: "user-profile",
  components: { PrimaryButton },
  data: () => ({
    store: useAuthStore(),
  }),
  methods: {
    signOut() {
      this.store.logout();
    },
  },
});
</script>

<style scoped></style>

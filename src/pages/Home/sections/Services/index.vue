<template>
  <div class="home-services">
    <h2 class="home-services-title">We provide you best services</h2>
    <div class="home-services-card-container">
      <ServicesCard
        title="Worldwide Traveling"
        content="You can plan trip not
      only across Ukraine but all over the world!"
        :image="sendIcon"
      />
      <ServicesCard
        title="Lot of choices"
        content="Our website provides you a wide range of places where to eat, stay, etc."
        :image="heartIcon"
      />
      <ServicesCard
        title="Easy planning"
        content="A few clicks and it’s done! Travel planning was never as possible!"
        :image="noteIcon"
      />
      <ServicesCard
        title="Our responsibility"
        content="We will offer the best choices for you - it's our responsibility"
        :image="securityIcon"
      />
    </div>
  </div>
</template>

<script>
import "./index.scss";
import ServicesCard from "@/pages/Home/components/ServicesCard.vue";
import HeartIcon from "@/assets/images/HeartIcon.svg";
import NoteIcon from "@/assets/images/NoteIcon.svg";
import SendIcon from "@/assets/images/SendIcon.svg";
import SecurityIcon from "@/assets/images/SecurityIcon.svg";

export default {
  name: "section-services",
  components: { ServicesCard },
  data: function () {
    return {
      heartIcon: HeartIcon,
      noteIcon: NoteIcon,
      sendIcon: SendIcon,
      securityIcon: SecurityIcon,
    };
  },
};
</script>
<style scoped></style>

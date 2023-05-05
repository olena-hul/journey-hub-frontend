<template>
  <form class="home-welcome-title-container-left-destination-form">
    <div>
      <img :src="pointImage" alt="Point image" />
      <SearchSelect
        :options="store.destinationsList"
        track-by="name"
        :custom-label="customLabel"
        v-model="selectedDestination"
      />
    </div>
    <div>
      <DatePicker ref="datepicker" v-model="selectedDates" />
    </div>
    <PrimaryButton
      :input-props="{
        disabled: this.selectedDates.length < 1 || !this.selectedDestination,
      }"
      @click="onSearchClick"
    >
      Search
    </PrimaryButton>
  </form>
</template>

<script lang="ts">
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";
import PointImage from "@/assets/images/Point.svg";
import CalendarImage from "@/assets/images/Calendar.svg";
import { defineComponent, ref } from "vue";
import DatePicker from "@/common/components/DatePicker/index.vue";
import SearchSelect from "@/common/components/SearchSelect/index.vue";
import { useDestinationStore } from "@/pages/Home/store/destinations";
import type { Destination } from "@/pages/Home/api";
import { usePlanningStore } from "@/pages/Planning/store/planning";

const datepicker = ref();
const date = ref();

const customLabel = (option: Destination) => {
  if (option.parent_destination) {
    return `${option.name}, ${option.parent_destination.name}`;
  }
  return option.name;
};
export default defineComponent({
  name: "DestinationForm",
  components: { SearchSelect, DatePicker, PrimaryButton },
  data: () => {
    return {
      pointImage: PointImage,
      calendarImage: CalendarImage,
      datepicker,
      date,
      store: useDestinationStore(),
      customLabel,
      selectedDestination: null as Destination | null,
      selectedDates: [],
      planningStore: usePlanningStore(),
    };
  },
  methods: {
    async onSearchClick() {
      if (this.selectedDates.length < 1 || !this.selectedDestination) {
        return;
      }
      this.store.saveUserChoice(this.selectedDates, this.selectedDestination);
      await this.planningStore.getAttractions(this.selectedDestination.id);
      this.planningStore.getPlannedTrip(this.selectedDates);
      this.$router.push({
        name: "Plan",
      });
    },
  },
  mounted() {
    this.store.getDestinations();
  },
});
</script>

<style scoped></style>

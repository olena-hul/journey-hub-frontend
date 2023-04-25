import { defineStore } from "pinia";
import { getDestinations } from "@/pages/Home/api";
import type { Destination } from "@/pages/Home/api";

interface DestinationsState {
  destinationsList: Destination[];
  selectedDates: Date[];
  selectedDestination: Destination | null;
}

export const useDestinationStore = defineStore({
  id: "destinations",
  state: () =>
    ({
      destinationsList: [],
      selectedDates: [],
      selectedDestination: null,
    } as DestinationsState),
  getters: {
    destinations: (state) => state.destinationsList,
  },
  actions: {
    async getDestinations() {
      try {
        const response = await getDestinations();

        this.destinationsList = response.data;
      } catch (e: any) {
        return { data: {}, error: e };
      }
    },
    saveUserChoice(selectedDates: Date[], selectedDestination: Destination) {
      this.selectedDates = selectedDates;
      this.selectedDestination = selectedDestination;
    },
  },
});

import { defineStore } from "pinia";
import { getDestinations } from "@/pages/Home/api";
import type { Destination } from "@/pages/Home/api";
import { LOCALSTORAGE_KEYS } from "@/common/constants";

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
    saveUserChoice(
      selectedDates: Date[],
      selectedDestination: Destination,
      persist = true
    ) {
      this.selectedDates = selectedDates;
      this.selectedDestination = selectedDestination;

      if (persist) {
        localStorage.setItem(
          LOCALSTORAGE_KEYS.selectedDates,
          JSON.stringify(selectedDates)
        );
        localStorage.setItem(
          LOCALSTORAGE_KEYS.selectedDestination,
          JSON.stringify(selectedDestination)
        );
      }
    },
  },
});

import { defineStore } from "pinia";
import type { Attraction, Budget, Trip } from "@/pages/Planning/api";
import { createTripAttractions, getMyTrips } from "@/pages/Planning/api";
import type { Destination } from "@/pages/Home/api";
import type { TripAttraction, TripDetail } from "@/pages/Profile/api";
import {
  getDaysInTrip,
  getTripDetail,
  getTripExpenses,
  getVisitedPlaces,
} from "@/pages/Profile/api";
import type { MyObject } from "@/common/interfaces";
import { convertCurrency, planTrip } from "@/pages/Planning/utils";
import { BUDGET_CATEGORIES } from "@/common/constants";

interface TripsState {
  myTrips: Trip[];
  visitedPlaces: Destination[];
  daysInTrips: MyObject;
  tripExpenses: MyObject;
  trip: TripDetail | null;
  plannedTrip: MyObject;
  selectedDates: Date[];
  estimatedExpenses: number[];
  actualExpenses: number[];
}

export const useTripsStore = defineStore({
  id: "trips",
  state: () =>
    ({
      myTrips: [],
      visitedPlaces: [],
      daysInTrips: {},
      tripExpenses: {},
      trip: null,
      plannedTrip: {},
      selectedDates: [],
      estimatedExpenses: [],
      actualExpenses: [],
    } as TripsState),

  actions: {
    async getMyTrips() {
      const trips = await getMyTrips();
      this.myTrips = trips.data;
      return trips;
    },

    async getVisitedPlaces() {
      const visitedPlaces = await getVisitedPlaces();
      this.visitedPlaces = visitedPlaces.data;
      return visitedPlaces;
    },

    async getDaysInTrips() {
      const daysInTrips = await getDaysInTrip();
      this.daysInTrips = daysInTrips.data;
      return daysInTrips;
    },
    async getTripExpenses() {
      const tripExpenses = await getTripExpenses();
      this.tripExpenses = tripExpenses.data;
      return tripExpenses;
    },
    async getTripDetail(trip_id: number) {
      const trip = await getTripDetail(trip_id);
      this.trip = trip.data;
      this.selectedDates = [
        new Date(this.trip.start_date),
        new Date(this.trip.end_date),
      ];
    },
    getPlannedTrip(selectedDates: Date[]) {
      this.plannedTrip = planTrip(selectedDates, this.plannedTrip);
    },
    async createTripAttraction(date: string, attraction: Attraction) {
      if (!this.trip || this.trip?.id === null) {
        return;
      }
      let newAttraction = await createTripAttractions([
        {
          trip: this.trip?.id as number,
          attraction: attraction.id,
          date: date,
          price:
            attraction.currency === this.trip.budgets.at(0)?.currency
              ? attraction.price
              : convertCurrency(
                  this.trip.budgets.at(0)?.currency || "$",
                  attraction.price
                ),
          currency:
            attraction.currency || this.trip.budgets.at(0)?.currency || "$",
        },
      ]);
      newAttraction = newAttraction.data?.at(0);
      return {
        ...newAttraction,
        attraction: attraction,
      };
    },
    async setBudget(budget: any) {
      if (!this.trip) {
        return;
      }
      this.trip.budgets[0] = budget;
    },
    async calculateExpenses() {
      if (!this.trip) {
        return;
      }
      const budget = this.trip.budgets.at(0) as Budget;
      const customExpenses = this.trip.custom_expenses;

      const estimatedExpenses = budget.entries.reduce(
        (accumulator: MyObject, entry) => {
          const category = entry.category;
          const amount = entry.estimated_amount;

          if (!accumulator[category]) {
            accumulator[category] = 0;
          }

          accumulator[category] += amount;

          return accumulator;
        },
        BUDGET_CATEGORIES.reduce(
          (obj, category) => ({ ...obj, [category]: 0 }),
          {}
        )
      );
      this.estimatedExpenses = Object.values(estimatedExpenses);

      const actualExpenses: MyObject = Object.values(this.plannedTrip).reduce(
        (accumulator: MyObject, attractions: any) => {
          attractions.forEach((tripAttraction: TripAttraction) => {
            const category = tripAttraction.attraction.budget_category;
            const amount = tripAttraction.price;

            if (!accumulator[category]) {
              accumulator[category] = 0;
            }

            accumulator[category] += Number(amount);
          });

          return accumulator;
        },
        BUDGET_CATEGORIES.reduce(
          (obj, category) => ({ ...obj, [category]: 0 }),
          {}
        )
      );

      customExpenses.map((customExpense) => {
        actualExpenses[customExpense.budget_category] += customExpense.price;
      });

      this.actualExpenses = Object.values(actualExpenses);
    },
  },
});

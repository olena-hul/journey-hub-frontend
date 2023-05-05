import { acceptHMRUpdate, defineStore } from "pinia";
import type {
  Attraction,
  Budget,
  BudgetInput,
  SuggestTripInput,
  Trip,
  TripAttractionInput,
  TripInput,
} from "@/pages/Planning/api";
import {
  createBudget,
  createTrip,
  createTripAttractions,
  deleteEntry,
  getAttractions,
  getTrip,
  suggestTrip,
  updateBudget,
} from "@/pages/Planning/api";
import { addDays, convertCurrency } from "@/pages/Planning/utils";
import { BUDGET_CATEGORIES } from "@/common/constants";
import type { MyObject } from "@/common/interfaces";

interface PlanningState {
  budget: Budget | null;
  trip: Trip | null;
  plannedTrip: any;
  attractions: Attraction[];
  suggestionInProgress: boolean;
  selectedDay: string | null;
  newPlaceVisible: boolean;
  estimatedExpenses: number[];
  actualExpenses: number[];
}

export const usePlanningStore = defineStore({
  id: "planning",
  state: () =>
    ({
      budget: {
        id: null,
        amount: 0,
        currency: "$",
        trip: 0,
        entries: [],
      },
      trip: null,
      plannedTrip: {},
      attractions: [],
      suggestionInProgress: false,
      selectedDay: null,
      newPlaceVisible: false,
      estimatedExpenses: [0, 0, 0, 0, 0, 0],
      actualExpenses: [0, 0, 0, 0, 0, 0],
    } as PlanningState),

  actions: {
    async getTrip(
      start_date: string,
      end_date: string,
      destination_id: number
    ) {
      const trip = await getTrip(start_date, end_date, destination_id);
      this.trip = trip.data.length > 0 ? trip.data[0] : null;
      if (this.trip && this.trip.budgets.length > 0) {
        this.budget = this.trip.budgets[0];
      }
      return this.trip;
    },

    async getAttractions(destination_id: number) {
      const attractions = await getAttractions(destination_id);
      this.attractions = attractions.data;
    },

    async setBudget(budget: any) {
      this.budget = budget as Budget;
    },
    async createTrip(body: TripInput) {
      const trip = await createTrip(body);
      this.trip = trip.data;
    },

    async createBudget(body: BudgetInput) {
      const budget = await createBudget(body);
      this.budget = budget.data;
    },
    async updateBudget(budgetId: number, body: BudgetInput) {
      const budget = await updateBudget(budgetId, body);
      this.budget = budget.data;
    },
    async deleteBudgetEntry(entryId: number) {
      await deleteEntry(entryId);
    },
    async suggestTrip(body: SuggestTripInput) {
      await suggestTrip(body);
    },
    async createTripAttractions() {
      if (!this.trip || !this.trip.destination) {
        return;
      }
      const tripAttractions: TripAttractionInput[] = [];
      Object.entries(this.plannedTrip).forEach(([date, attractions]) => {
        (attractions as Attraction[]).map((attraction) => {
          tripAttractions.push({
            destination: this.trip?.destination || 0,
            attraction: attraction.id,
            date: date,
            price:
              attraction.currency === this.budget?.currency
                ? attraction.price
                : convertCurrency(
                    this.budget?.currency || "$",
                    attraction.price
                  ),
            currency: attraction.currency || this.budget?.currency || "$",
          });
        });
      });
      await createTripAttractions(tripAttractions);
    },
    getPlannedTrip(selectedDates: Date[]) {
      const [startDate, endDate] = selectedDates;

      for (const dateStr in this.plannedTrip) {
        const date = new Date(dateStr);

        // determine whether date is inside start-end range
        if (date >= selectedDates[0] && date <= selectedDates[1]) {
          // date is already in range, do nothing
        } else {
          // date is not in range, delete it
          delete this.plannedTrip[dateStr as string];
        }
      }
      // add new dates from start-end range if they are not present in plannedTrip
      for (
        let d: Date = startDate;
        d.getTime() <= endDate.getTime();
        d = addDays(d, 2)
      ) {
        const dateStr: any = d.toISOString().substring(0, 10);
        if (!(dateStr in this.plannedTrip)) {
          this.plannedTrip[dateStr] = [];
        }
      }
      // sort dates in ascending order
      const sortedDates = Object.keys(this.plannedTrip).sort();
      const sortedTrip: MyObject = {};
      for (const dateStr of sortedDates) {
        sortedTrip[dateStr] = this.plannedTrip[dateStr as any];
      }
      this.plannedTrip = sortedTrip;
    },
    calculateExpenses() {
      if (this.budget === null || !this.plannedTrip) {
        return;
      }

      const estimatedExpenses = this.budget.entries.reduce(
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

      const actualExpenses = Object.values(this.plannedTrip).reduce(
        (accumulator: MyObject, attractions: any) => {
          attractions.forEach((attraction: Attraction) => {
            const category = attraction.budget_category;
            const amount = attraction.price;

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

      this.actualExpenses = Object.values(actualExpenses);
    },
  },
});

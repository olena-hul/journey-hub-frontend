import { defineStore } from "pinia";
import type {
  Budget,
  BudgetInput,
  Trip,
  TripInput,
} from "@/pages/Planning/api";
import {
  createBudget,
  createTrip,
  deleteEntry,
  getTrip,
  updateBudget,
} from "@/pages/Planning/api";

interface PlanningState {
  budget: Budget | null;
  trip: Trip | null;
}

export const usePlanningStore = defineStore({
  id: "planning",
  state: () =>
    ({
      budget: {
        id: 0,
        amount: 0,
        currency: "$",
        trip: 0,
        entries: [],
      },
      trip: null,
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
  },
});

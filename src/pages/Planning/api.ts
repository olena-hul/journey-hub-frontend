import http from "@/common/api_client/index";
import { API_URL } from "@/common/constants";
import type { APIResponse } from "@/common/interfaces";

const BUDGET_URL = `${API_URL}planning/budgets/`;
const BUDGET_ENTRIES_URL = `${API_URL}planning/budget-entries/`;
const TRIPS_URL = `${API_URL}planning/trips/`;

export interface BudgetEntryInput {
  estimated_amount: number;
  amount_spent: number;
  category: string;
}

export interface BudgetEntry extends BudgetEntryInput {
  id: number;
}
export interface BudgetInput {
  amount: number;
  currency: string;
  trip: number;
  entries: BudgetEntryInput[];
}

export interface Budget extends BudgetInput {
  id: number;
  entries: BudgetEntry[];
}

export interface TripInput {
  start_date: string;
  end_date: string;
  destination: number;
  user: number;
}

export interface Trip extends TripInput {
  id: number;
  budgets: Budget[];
}

export async function getTrip(
  start_date: string,
  end_date: string,
  destination_id: number
): Promise<APIResponse<Trip[]>> {
  return await http.get(TRIPS_URL, {
    params: {
      start_date,
      end_date,
      destination_id,
    },
  });
}

export async function createTrip(body: TripInput) {
  return await http.post(TRIPS_URL, { body });
}

export async function createBudget(
  body: BudgetInput
): Promise<APIResponse<Budget>> {
  return await http.post(BUDGET_URL, { body });
}

export async function updateBudget(
  budgetId: number,
  body: BudgetInput
): Promise<APIResponse<Budget>> {
  return await http.put(`${BUDGET_URL}${budgetId}/`, { body });
}

export async function deleteEntry(entryId: number) {
  return await http.remove(`${BUDGET_ENTRIES_URL}${entryId}/`, {});
}

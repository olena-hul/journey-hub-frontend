import http from "@/common/api_client/index";
import { API_URL } from "@/common/constants";
import type { APIResponse } from "@/common/interfaces";
import type { Location } from "@/pages/Home/api";

const BUDGET_URL = `${API_URL}planning/budgets/`;
const BUDGET_ENTRIES_URL = `${API_URL}planning/budget-entries/`;
const TRIPS_URL = `${API_URL}planning/trips/`;
const ATTRACTIONS_URL = `${API_URL}planning/attractions/`;
const SUGGEST_TRIP_URL = `${API_URL}planning/suggest-trip/`;
const TRIP_ATTRACTIONS_URL = `${API_URL}planning/trip-attractions/`;

export interface BudgetEntryInput {
  estimated_amount: number;
  amount_spent: number;
  category: string;
}

export interface BudgetEntry extends BudgetEntryInput {
  id: number | null;
}
export interface BudgetInput {
  amount: number;
  currency: string;
  trip: number;
  entries: BudgetEntryInput[];
}

export interface Budget extends BudgetInput {
  id: number | null;
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

export interface SuggestTripInput {
  destination: string;
  start_date: string;
  end_date: string;
  budget: number;
  currency: string;
}

export interface Attraction {
  id: number;
  location: Location;
  name: string;
  description: string;
  attraction_type: string;
  rating: number;
  ratings_count: number;
  views_count: number;
  price: number;
  address: string;
  image_urls: string[];
  duration: number;
  budget_category: string;
  destination: number;
  currency: string | null;
}

export interface TripAttractionInput {
  destination: number;
  attraction: number;
  date: string;
  price: number;
  currency: string;
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

export async function getAttractions(
  destination_id: number | null
): Promise<APIResponse<Attraction[]>> {
  return await http.get(ATTRACTIONS_URL, {
    params: {
      destination_id,
    },
  });
}

export async function suggestTrip(
  body: SuggestTripInput
): Promise<APIResponse> {
  return await http.post(SUGGEST_TRIP_URL, {
    body,
  });
}

export async function createTripAttractions(
  body: TripAttractionInput[]
): Promise<APIResponse> {
  return await http.post(TRIP_ATTRACTIONS_URL, {
    body,
  });
}

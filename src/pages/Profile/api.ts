import http from "@/common/api_client/index";
import { API_URL } from "@/common/constants";
import type { APIResponse } from "@/common/interfaces";
import type { Destination } from "@/pages/Home/api";
import type {
  Attraction,
  Trip,
  TripAttractionInput,
} from "@/pages/Planning/api";

const TRIPS_URL = `${API_URL}planning/trips/`;
const TRIP_ATTRACTION_URL = `${API_URL}planning/trip-attractions/`;

export interface TripAttraction extends TripAttractionInput {
  id: number;
  attraction: Attraction;
  date: string;
  visited: boolean;
  note: string;
  price: number;
  currency: string;
}

export interface CustomExpense {
  date: string;
  description: string;
  attraction: Attraction;
  price: number;
  currency: string;
  budget_category: string;
}

export interface TripDetail extends Trip {
  destination: Destination;
  trip_attractions: TripAttraction[];
  custom_expenses: CustomExpense[];
}

export async function getVisitedPlaces(): Promise<APIResponse<Destination[]>> {
  return await http.get(`${TRIPS_URL}visited-places/`, {});
}

export async function getDaysInTrip(): Promise<APIResponse> {
  return await http.get(`${TRIPS_URL}trip-days/`, {});
}

export async function getTripExpenses(): Promise<APIResponse> {
  return await http.get(`${TRIPS_URL}trip-expenses/`, {});
}

export async function getTripDetail(
  trip_id: number
): Promise<APIResponse<TripDetail>> {
  return await http.get(`${TRIPS_URL}${trip_id}/`, {});
}

export async function removeTripAttraction(id: number) {
  return await http.remove(`${TRIP_ATTRACTION_URL}${id}/`, {});
}

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
const EXCURSION_BOOKINGS_URL = `${API_URL}excursion-bookings`;
const EXCURSIONS_URL = `${API_URL}excursions`;

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

export interface ExcursionAttraction {
  id: number;
  attraction: Attraction;
  start_time: string;
  end_time: string;
  description: string;
}

export interface Excursion {
  id: number;
  guide: any;
  name: string;
  description: string;
  date: string;
  price: number;
  currency: "$";
  start_address: string;
  excursion_attractions: ExcursionAttraction[];
}

export interface ExcursionBooking {
  id: number;
  excursion: Excursion;
  adults_count: number;
  children_count: number;
  session_url: string;
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

export async function getExcursionBookings(
  user_id: number
): Promise<APIResponse<ExcursionBooking[]>> {
  return await http.get(`${EXCURSION_BOOKINGS_URL}/`, {
    params: {
      user_id,
    },
  });
}

export async function getExcursions(): Promise<APIResponse<Excursion[]>> {
  return await http.get(`${EXCURSIONS_URL}/`, {});
}

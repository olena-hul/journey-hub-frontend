import http from "@/common/api_client/index";
import { API_URL } from "@/common/constants";
import type { APIResponse } from "@/common/interfaces";
import type { Destination } from "@/pages/Home/api";
import type {
  Attraction,
  Trip,
  TripAttractionInput,
} from "@/pages/Planning/api";
import CustomExpense from "@/pages/Profile/sections/MyTrips/components/CustomExpense.vue";
import type { User } from "@/pages/Home/store/auth";

const TRIPS_URL = `${API_URL}planning/trips/`;
const TRIP_ATTRACTION_URL = `${API_URL}planning/trip-attractions/`;
const EXCURSION_BOOKINGS_URL = `${API_URL}excursion-bookings`;
const EXCURSIONS_URL = `${API_URL}excursions`;
const RATES_URL = `${API_URL}rates/`;
const CUSTOM_EXPENSES_URL = `${API_URL}planning/custom-expenses/`;
const USER_URL = `${API_URL}auth/user`;

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
  id: number;
  date: string;
  description: string;
  attraction: Attraction;
  price: number;
  currency: string;
  budget_category: string;
}

export interface CustomExpense {
  id: number;
  date: string;
  description: string;
  attraction: Attraction;
  price: number;
  currency: string;
  budget_category: string;
}

export interface CustomExpenseInput {
  date: string;
  description: string;
  attraction: string;
  price: number;
  currency: string;
  budget_category: string;
  trip: number;
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
  guide: User;
  name: string;
  description: string;
  date: string;
  price: number;
  currency: string;
  start_address: string;
  excursion_attractions: ExcursionAttraction[];
}

export interface CreateExcursionAttraction {
  attraction: string;
  start_time: string;
  end_time: string;
  description: string;
}

export interface CreateExcursion {
  guide: number;
  name: string;
  description: string;
  date: string;
  price: number;
  currency: string;
  start_address: string;
  excursion_attractions: CreateExcursionAttraction[];
}

export interface ExcursionBooking {
  id: number;
  excursion: Excursion;
  adults_count: number;
  children_count: number;
  session_url: string;
  payment_status: string;
}

export interface ExcursionBookingInput {
  phone_number: string;
  excursion: number;
  adults_count: number;
  children_count: number;
}

export interface UpdateTripAttractionInput {
  price: number | undefined;
  currency: string | undefined;
  visited: boolean | undefined;
}

export interface RateInput {
  user: number;
  value: number;
  feedback: string;
  destination: number | undefined;
  attraction: number | undefined;
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

export async function createBooking(
  body: ExcursionBookingInput
): Promise<APIResponse<ExcursionBooking>> {
  return await http.post(`${EXCURSION_BOOKINGS_URL}/`, { body });
}

export async function imageUpload(file: any, attraction: any, user: any) {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("attraction", attraction);
  formData.append("user", user);
  return await http.post(`${API_URL}planning/image-upload/`, {
    body: formData,
  });
}

export async function updateTripAttraction(
  id: number,
  body: UpdateTripAttractionInput
): Promise<APIResponse<TripAttraction>> {
  return http.patch(`${TRIP_ATTRACTION_URL}${id}/`, { body });
}

export async function getTripAttraction(
  id: number
): Promise<APIResponse<TripAttraction>> {
  return http.get(`${TRIP_ATTRACTION_URL}${id}/`, {});
}

export async function createRate(
  body: RateInput
): Promise<APIResponse<TripAttraction>> {
  return http.post(RATES_URL, { body });
}

export async function createCustomExpense(body: CustomExpenseInput) {
  return http.post(CUSTOM_EXPENSES_URL, { body });
}

export async function removeCustomExpense(id: number) {
  return http.remove(`${CUSTOM_EXPENSES_URL}${id}`, {});
}

export async function createExcursion(body: CreateExcursion) {
  return await http.post(`${EXCURSIONS_URL}/`, { body });
}

export async function updateUser(body: any) {
  return await http.put(USER_URL, { body });
}

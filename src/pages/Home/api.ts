import http from "@/common/api_client/index";
import { API_URL } from "@/common/constants";
import type { APIResponse } from "@/common/interfaces";

const USER_URL = `${API_URL}auth/user`;
const REGISTER_URL = `${API_URL}auth/register`;
const DESTINATION_URL = `${API_URL}destinations/`;

export interface SignInInput {
  email: string;
  password: string;
}

export interface BaseSignUpInput {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

interface Location {
  latitude: number;
  longitude: number;
}
export interface Destination {
  id: number;
  location: Location;
  name: string;
  description: string;
  destination_type: string;
  rating: number;
  ratings_count: number;
  views_count: number;
  image_urls: string[];
  parent_destination?: Destination;
}

export interface SignUpInput extends BaseSignUpInput {
  password: string;
}

export interface SignUpInputGoogleAuth extends BaseSignUpInput {
  token: string;
}

export async function getUser(): Promise<APIResponse> {
  return await http.get(USER_URL, {});
}

export async function register(body: BaseSignUpInput): Promise<any> {
  return await http.post(REGISTER_URL, { body });
}

export async function getDestinations(): Promise<APIResponse<Destination[]>> {
  return await http.get(DESTINATION_URL, {});
}

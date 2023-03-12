import http from "@/common/api_client/index";
import { API_URL } from "@/common/constants";
import type { APIResponse } from "@/common/interfaces";

const USER_URL = `${API_URL}auth/user`;
const REGISTER_URL = `${API_URL}auth/register`;

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

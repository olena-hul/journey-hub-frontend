import http from "@/common/api_client/index";
import { API_URL } from "@/common/constants";

const LOGIN_URL = `${API_URL}auth/login`;

export interface SignInInput {
  email: string;
  password: string;
}

export async function login(body: SignInInput) {
  return await http.post(LOGIN_URL, { body });
}

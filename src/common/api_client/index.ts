import axios from "axios";
import { auth } from "@/firebase/config";
import type { APIResponse } from "@/common/interfaces";

async function request(
  url: string,
  method: string,
  params = {},
  headers: any = {},
  body = {}
): Promise<APIResponse> {
  try {
    const token = await auth.currentUser?.getIdToken();
    headers["Authorization"] = `Bearer ${token}`;
    const { data } = await axios.request({
      url,
      method,
      headers,
      params,
      data: body,
    });
    return {
      data,
      error: null,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(
        "error message: ",
        error.response?.data.error || error.message
      );
      return {
        data: null,
        error: error.response?.data.error || error.message,
      };
    } else {
      console.log("unexpected error: ", error);
      return {
        data: null,
        error: error as string,
      };
    }
  }
}

async function get(url: string, { params = {}, headers = {}, body = {} }) {
  return request(url, "get", params, headers, body);
}

async function post(url: string, { params = {}, headers = {}, body = {} }) {
  return request(url, "post", params, headers, body);
}

async function put(url: string, { params = {}, headers = {}, body = {} }) {
  return request(url, "put", params, headers, body);
}

async function patch(url: string, { params = {}, headers = {}, body = {} }) {
  return request(url, "patch", params, headers, body);
}

async function remove(url: string, { params = {}, headers = {}, body = {} }) {
  return request(url, "delete", params, headers, body);
}

export default {
  get,
  post,
  put,
  patch,
  remove,
};

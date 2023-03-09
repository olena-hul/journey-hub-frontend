import axios from "axios";

async function request(
  url: string,
  method: string,
  params = {},
  headers = {},
  body = {}
) {
  try {
    const { data } = await axios.request({
      url,
      method,
      headers,
      params,
      data: body,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
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

async function remove(url: string, { params = {}, headers = {}, body = {} }) {
  return request(url, "delete", params, headers, body);
}

export default {
  get,
  post,
  put,
  remove,
};

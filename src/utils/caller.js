import { apiConfig } from "../config";
import axios from "axios";
const apiCaller = async (method, endpoint, body, headers, params) => {
  return await axios({
    method,
    url: apiConfig.baseURL + endpoint,
    data: Object.assign({}, body),
    headers: Object.assign({}, headers),
    params: Object.assign({}, params),
  });
};

export const get = async (
  endpoint = "",
  body = {},
  headers = {},
  params = {}
) => await apiCaller("GET", endpoint, body, headers, params);

export const post = async (
  endpoint = "",
  body = {},
  headers = {},
  params = {}
) => await apiCaller("POST", endpoint, body, headers, params);

export const put = async (
  endpoint = "",
  body = {},
  headers = {},
  params = {}
) => await apiCaller("PUT", endpoint, body, headers, params);

export const del = async (
  endpoint = "",
  body = {},
  headers = {},
  params = {}
) => await apiCaller("DELETE", endpoint, body, headers, params);

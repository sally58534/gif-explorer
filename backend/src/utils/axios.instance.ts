import axios from "axios";

import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GIPHY_API_KEY;
const BASE_URL = process.env.GIPHY_API_BASE_URL;
const BASE_VERSION = process.env.GIPHY_API_VERSION;
const BASE_RESOURCE_PATH = process.env.GIPHY_API_RESOURCE_PATH;

const apiClient = axios.create({
  baseURL: `${BASE_URL}/${BASE_VERSION}/${BASE_RESOURCE_PATH}`,
  params: {
    apiKey: API_KEY,
    api_key: API_KEY
  }
});

export default apiClient;

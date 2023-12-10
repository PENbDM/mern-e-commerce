import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// Get user data from local storage
const persistedRoot = localStorage.getItem("persist:root");
const userDataFromLocalStorage = persistedRoot
  ? JSON.parse(JSON.parse(persistedRoot).user)
  : null;

// Check if user data and accessToken exist
const TOKEN = userDataFromLocalStorage?.currentUser?.user.token || null;
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});

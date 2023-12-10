// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api";

// // Function to create userRequest instance with the latest token
// export const createUserRequest = () => {
//   const persistedRoot = localStorage.getItem("persist:root");
//   const userDataFromLocalStorage = persistedRoot
//     ? JSON.parse(JSON.parse(persistedRoot).user)
//     : null;
//   const TOKEN = userDataFromLocalStorage?.currentUser?.user.token || null;
//   console.log(TOKEN);
//   return axios.create({
//     baseURL: BASE_URL,
//     headers: { token: `Bearer ${TOKEN}` },
//   });
// };
// // Initial instances
// export const publicRequest = axios.create({
//   baseURL: BASE_URL,
// });

// export let userRequest = createUserRequest();

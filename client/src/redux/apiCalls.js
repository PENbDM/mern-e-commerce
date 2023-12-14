import { useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
} from "./userRedux";
import { vercelURL } from "../App";

import { URL } from "../App";
import axios from "axios";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${vercelURL}/auth/login`, user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure(err));
    throw err;
  }
};
export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(`${vercelURL}/auth/register`, user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure(err));
    throw err;
  }
};

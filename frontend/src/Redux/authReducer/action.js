import axios from "axios";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS,
} from "../actionTypes";

const userAPI = "http://localhost:5000/users" 

//login
export const loginAction = (user) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  axios
    .post(`${userAPI}/login`, user)
    .then((res) => {
      dispatch({ type: LOGIN_SUCCESS, payload: res?.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: LOGIN_FAILURE });
    });
};

//signup
export const signupAction = (user) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  return axios
    .post(`${userAPI}/register`, user)
    .then((res) => {
      console.log(res);
      dispatch({type: SIGNUP_SUCCESS, payload: res?.data?.message})
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: LOGIN_FAILURE });
    });
};

//logout
export const logoutAction = () => (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS });
}




export default userAPI;


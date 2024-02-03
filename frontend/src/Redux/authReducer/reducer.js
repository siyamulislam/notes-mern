import {
  deleteItemLS,
  getItemLS,
  setItemLS,
} from "../../localStorage/localStorage";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS,
} from "../actionTypes";

const initialState = {
  isLoading: false,
  token: getItemLS("auth")?.token || "",
  isAuth: getItemLS("auth")?.isAuth || false,
  message: "",
  username: getItemLS("auth")?.username || "",
  isError: false,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST: {
      return { ...state, isLoading: true };
    }
    case LOGIN_SUCCESS: {
      if (!payload?.accessToken) {
        return { ...state, isLoading: false, message: payload?.message };
      } else {
        let user = {
          token: payload?.accessToken,
          isAuth: true,
          username: payload?.username,
        };
        setItemLS("auth", user);
        return {
          ...state,
          isLoading: false,
          token: getItemLS("auth")?.token,
          isAuth: getItemLS("auth")?.isAuth,
          username: getItemLS("auth")?.username,
          message: payload?.message,
          regMsg: "",
        };
      }
    }
    case LOGIN_FAILURE: {
      return { ...state, isLoading: false, isError: true };
    }
    case SIGNUP_SUCCESS: {
      return { ...state, isLoading: false, regMsg: payload };
    }
    case LOGOUT_SUCCESS: {
      deleteItemLS("token");
      deleteItemLS("auth");
      return { ...initialState, isAuth: false, token: "" };
    }
    default:
      return initialState;
  }
};

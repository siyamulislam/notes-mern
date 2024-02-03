import axios from "axios";
import { getItemLS } from "../../localStorage/localStorage";
import {
  ADDNOTES_SUCCESS,
  NOTES_DELETE,
  NOTES_FAILURE,
  NOTES_REQUEST,
  NOTES_SUCCESS,
  UPDATENOTES_SUCCESS,
} from "../actionTypes";

const noteAPI = "http://localhost:5000" 

//GET Notes
export const getNotesAction = (title="", sort="newest") => (dispatch) => {
  dispatch({ type: NOTES_REQUEST });

  const token = getItemLS("auth")?.token || "";

  let params = {};
  if(title){
    params["title"] = title;
  }

  if(sort){
    params["sort"] = sort;
  }
  
  const queryParams = new URLSearchParams(params).toString();

  axios(`${noteAPI}/notes?${queryParams}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.data) {
        dispatch({ type: NOTES_SUCCESS, payload: [] });
      } else {
        dispatch({ type: NOTES_SUCCESS, payload: res?.data });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: NOTES_FAILURE });
    });
};

//POST Notes
export const addNotesAction = (note) => (dispatch) => {

  dispatch({ type: NOTES_REQUEST });

  const token = getItemLS("auth")?.token || "";

  return axios
    .post(`${noteAPI}/notes/create`, note, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch({ type: ADDNOTES_SUCCESS, payload: res?.data?.message });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: NOTES_FAILURE });
    });
};

//PATCH Notes
export const upateNotesAction = (note) => (dispatch) => {
  dispatch({ type: NOTES_REQUEST });
  const token = getItemLS("auth")?.token || "";
  return axios
    .patch(
      `${noteAPI}/notes/update/${note?._id}`,
      note,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({ type: UPDATENOTES_SUCCESS, payload: res?.data?.message });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: NOTES_FAILURE });
    });
};

//DELETE Notes
export const deleteNoteAction = (id) => (dispatch) => {
  dispatch({ type: NOTES_REQUEST });
  const token = getItemLS("auth")?.token || "";
  return axios(`${noteAPI}/notes/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      dispatch({ type: NOTES_DELETE });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: NOTES_FAILURE });
    });
};


export default noteAPI;
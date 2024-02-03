import { ADDNOTES_SUCCESS, NOTES_DELETE, NOTES_FAILURE, NOTES_REQUEST, NOTES_SUCCESS, UPDATENOTES_SUCCESS } from "../actionTypes";

const initialState = {
  isLoading: false,
  data: [],
  isError: false,
  addNoteMsg: "",
  updateNoteMsg: ""
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case NOTES_REQUEST: {
      return { ...state, isLoading: true };
    }
    case NOTES_SUCCESS: {
      return { ...state, isLoading: false, data: payload };
    }
    case NOTES_FAILURE: {
      return { ...state, isLoading: false, isError: true };
    }
    case NOTES_DELETE: {
      return { ...state, isLoading: false};
    }
    case ADDNOTES_SUCCESS:{
      return {...state, isLoading:false, addNoteMsg:payload}
    }
    case UPDATENOTES_SUCCESS:{
      return {...state, isLoading:false, updateNoteMsg:payload}
    }
    default:
      return initialState;
  }
};

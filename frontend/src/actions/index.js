import { FETCH_FAIL, FETCH_SUCCESS, FETCH_REQUEST } from '../helper/types';

export const fetchRequest = () => (dispatch) => {
  dispatch({ type: FETCH_REQUEST });
};

export const fetchSuccess = (data) => (dispatch) => {
  dispatch({ type: FETCH_SUCCESS, payload: data });
};

export const fetchFail = (err) => (dispatch) => {
  dispatch({ type: FETCH_FAIL, payload: err });
};

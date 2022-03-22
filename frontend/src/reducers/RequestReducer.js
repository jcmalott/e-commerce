import { FETCH_FAIL, FETCH_SUCCESS, FETCH_REQUEST } from '../helper/types';

const RequestReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return { ...state, result: action.payload, loading: false };
    case FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default RequestReducer;

import { FETCH_FAIL, FETCH_SUCCESS, FETCH_REQUEST } from '../helper/types';

const ProductsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return { ...state, products: action.payload, loading: false };
    case FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default ProductsReducer;

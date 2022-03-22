import axios from 'axios';
import {
  FETCH_FAIL,
  FETCH_SUCCESS,
  FETCH_REQUEST,
  CART_ADD_ITEM,
} from '../helper/types';
import { getError } from '../utils';

export const fetchRequest = () => (dispatch) => {
  dispatch({ type: FETCH_REQUEST });
};

export const fetchSuccess = (data) => (dispatch) => {
  dispatch({ type: FETCH_SUCCESS, payload: data });
};

export const fetchFail = (err) => (dispatch) => {
  dispatch({ type: FETCH_FAIL, payload: getError(err) });
};

export const addItemToCart = (item) => async (dispatch) => {
  const { data } = await axios.get(`/api/products/${item._id}`);
  if (data.countInStock < 1) {
    window.alert('Sorry. Product is out of stock!');
  } else {
    item.quantity = 1;
    dispatch({ type: CART_ADD_ITEM, payload: item });
  }
};

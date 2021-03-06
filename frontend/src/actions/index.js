import axios from 'axios';
import {
  FETCH_FAIL,
  FETCH_SUCCESS,
  FETCH_REQUEST,
  CART_ADD_ITEM,
  CART_SUBTRACT_ITEM,
  CART_REMOVE_ITEM,
  SIGN_IN_USER,
  SIGN_OUT_USER,
  SHIPPING_USER_INFO,
  SAVE_PAYMENT_METHOD,
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
    dispatch({ type: CART_ADD_ITEM, payload: item });
  }
};

export const subtractItemFromCart = (item) => (dispatch) => {
  dispatch({ type: CART_SUBTRACT_ITEM, payload: item });
};

export const removeItemFromCart = (item) => (dispatch) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: item });
};

export const signinUser = (data) => (dispatch, getState) => {
  dispatch({
    type: SIGN_IN_USER,
    payload: data,
    cart: getState().cartReducer,
    shipping: getState().shippingReducer,
  });
};

export const signoutUser = () => (dispatch, getState) => {
  dispatch({
    type: SIGN_OUT_USER,
    cart: getState().cartReducer,
    shipping: getState().shippingReducer,
  });
};

export const addShippingAddress = (shippingAddress) => (dispatch) => {
  dispatch({
    type: SHIPPING_USER_INFO,
    payload: shippingAddress,
  });
};

export const addPaymentMethod = (paymentMethod) => (dispatch) => {
  dispatch({
    type: SAVE_PAYMENT_METHOD,
    payload: paymentMethod,
  });
};

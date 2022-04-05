import { SIGN_IN_USER, SIGN_OUT_USER } from '../helper/types';

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const SignInReducer = (state = { userInfo: userInfo }, action) => {
  switch (action.type) {
    case SIGN_IN_USER:
      const itemsInCart = localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [];
      const shippingAddress = localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {};
      action.cart.cartItems = itemsInCart;
      action.shipping.shippingAddress = shippingAddress;
      return { ...state, userInfo: action.payload };
    case SIGN_OUT_USER:
      localStorage.removeItem('userInfo');
      // localStorage.removeItem('shippingAddress'); // this info should be in the database?
      action.cart.cartItems = [];
      action.shipping.shippingAddress = {};
      return {
        ...state,
        userInfo: null,
      };
    default:
      return state;
  }
};

export default SignInReducer;

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
      const paymentMethod = localStorage.getItem('paymentMethod')
        ? JSON.parse(localStorage.getItem('paymentMethod'))
        : '';
      action.cart.cartItems = itemsInCart;
      action.shipping.shippingAddress = shippingAddress;
      action.shipping.paymentMethod = paymentMethod;
      return { ...state, userInfo: action.payload };
    case SIGN_OUT_USER:
      localStorage.removeItem('userInfo');
      localStorage.removeItem('paymentMethod');
      localStorage.removeItem('shippingAddress'); // this info should be in the database?
      action.cart.cartItems = [];
      action.shipping.shippingAddress = {};
      action.shipping.paymentMethod = '';
      return {
        ...state,
        userInfo: null,
      };
    default:
      return state;
  }
};

export default SignInReducer;

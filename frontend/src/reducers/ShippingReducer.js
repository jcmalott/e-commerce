import { SHIPPING_USER_INFO } from '../helper/types';

const getShippingAddress = () => {
  if (localStorage.getItem('userInfo')) {
    const address = localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {};
    return { shippingAddress: address };
  } else {
    return { shippingAddress: {} };
  }
};

const ShippingReducer = (state = getShippingAddress(), action) => {
  switch (action.type) {
    case SHIPPING_USER_INFO:
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
      return {
        ...state,
        shippingAddress: action.payload,
      };
    default:
      return state;
  }
};

export default ShippingReducer;

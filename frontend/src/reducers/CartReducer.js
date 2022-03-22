import { CART_ADD_ITEM } from '../helper/types';

const CartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const newItem = action.payload;
      const existItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );

      const cartItems = existItem
        ? state.cartItems.map((item) => {
            if (item._id === existItem._id) {
              existItem.quantity++;
              return existItem;
            } else {
              return item;
            }
          })
        : [...state.cartItems, newItem];

      return {
        ...state,
        cartItems: cartItems,
      };
    default:
      return state;
  }
};

export default CartReducer;

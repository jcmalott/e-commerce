import {
  CART_ADD_ITEM,
  CART_SUBTRACT_ITEM,
  CART_REMOVE_ITEM,
} from '../helper/types';

const getCartItems = () => {
  if (localStorage.getItem('userInfo')) {
    const itemsInCart = localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [];
    return { cartItems: itemsInCart };
  } else {
    return { cartItems: [] };
  }
};

const CartReducer = (state = getCartItems(), action) => {
  const cartItem = action.payload;
  let existItem;
  let newCartItems = [];

  switch (action.type) {
    case CART_ADD_ITEM:
      existItem = state.cartItems.find((item) => item._id === cartItem._id);
      newCartItems = setQuantity(state.cartItems, cartItem, existItem, 1);
      return {
        ...state,
        cartItems: newCartItems,
      };
    case CART_SUBTRACT_ITEM:
      existItem = state.cartItems.find((item) => item._id === cartItem._id);
      newCartItems = setQuantity(state.cartItems, cartItem, existItem, -1);
      return {
        ...state,
        cartItems: newCartItems,
      };

    case CART_REMOVE_ITEM:
      const cartItems = state.cartItems.filter(
        (item) => item._id !== cartItem._id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cartItems };
    default:
      return state;
  }
};

const setQuantity = (items, newItem, existItem, quantity) => {
  let cartItems = [];
  if (existItem) {
    cartItems = items.map((item) => {
      if (item._id === existItem._id) {
        existItem.quantity += quantity;
        return existItem;
      } else {
        return item;
      }
    });
  } else {
    // item is new so create quantity attribute
    if (quantity > -1) newItem.quantity = 1;
    cartItems = [...items, newItem];
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  return cartItems;
};

export default CartReducer;

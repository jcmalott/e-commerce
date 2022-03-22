import RequestReducer from './RequestReducer';
import { combineReducers } from 'redux';
import CartReducer from './CartReducer';

export default combineReducers({
  requestReducer: RequestReducer,
  cartReducer: CartReducer,
});

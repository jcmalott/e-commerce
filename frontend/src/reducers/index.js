import RequestReducer from './RequestReducer';
import { combineReducers } from 'redux';
import CartReducer from './CartReducer';
import SignInReducer from './SignInReducer';

export default combineReducers({
  requestReducer: RequestReducer,
  cartReducer: CartReducer,
  signinReducer: SignInReducer,
});

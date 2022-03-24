import { SIGN_IN_USER, SIGN_OUT_USER } from '../helper/types';

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const SignInReducer = (state = { userInfo: userInfo }, action) => {
  switch (action.type) {
    case SIGN_IN_USER:
      return { ...state, userInfo: action.payload };
    case SIGN_OUT_USER:
      localStorage.removeItem('userInfo');
      return { ...state, userInfo: null };
    default:
      return state;
  }
};

export default SignInReducer;

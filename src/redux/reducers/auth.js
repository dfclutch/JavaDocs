import {
  SET_LOGIN_DID_ERROR,
  SET_LOGIN_INPUT_ERRORS,
  SET_LOGIN_LOADING,
  SET_REGISTER_DID_ERROR,
  SET_REGISTER_INPUT_ERRORS,
  SET_REGISTER_LOADING,
  SET_USER
} from "../actionTypes.js/auth";

const initialState = {
  isAuthenticated: false,
  user: {},
  register: {
    loading: false,
    didError: false,
    inputErrors: {}
  },
  login: {
    loading: false,
    didError: false,
    inputErrors: {}
  }
};

export default function auth(state = initialState, action) {
  switch(action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user
      };
    case SET_REGISTER_LOADING:
      return {
        ...state,
        register: {
          ...state.register,
          loading: action.status
        }
      };
    case SET_REGISTER_DID_ERROR:
      return {
        ...state,
        register: {
          ...state.register,
          didError: action.didError
        }
      };
    case SET_REGISTER_INPUT_ERRORS:
      return {
        ...state,
        register: {
          ...state.register,
          inputErrors: action.inputErrors,
        }
      };
    case SET_LOGIN_LOADING:
      return {
        ...state,
        login: {
          ...state.login,
          loading: action.status
        }
      };
    case SET_LOGIN_DID_ERROR:
      return {
        ...state,
        login: {
          didError: action.didError
        }
      };
    case SET_LOGIN_INPUT_ERRORS:
      return {
        ...state,
        login: {
          ...state.login,
          inputErrors: action.inputErrors
        }
      };
    default:
      return state;
  }
}
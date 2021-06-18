export function getUser(state) {
  return state.auth.user;
}

export function getRegisterLoading(state) {
  return state.auth.register.loading;
}

export function getRegisterDidError(state) {
  return state.auth.register.didError;
}

export function getRegisterInputErrors(state) {
  return state.auth.register.inputErrors;
}

export function getLoginLoading(state) {
  return state.auth.login.loading;
}

export function getLoginDidError(state) {
  return state.auth.login.didError;
}

export function getLoginInputErrors(state) {
  return state.auth.login.inputErrors;
}
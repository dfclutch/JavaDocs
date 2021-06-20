import { get, some } from "lodash";
import { fetchWithoutToken } from "../../utilities/fetch";

export async function loginUser({
  username,
  password
}) {
  const loginResponse = await fetchWithoutToken(
    '/users/login',
    'POST',
    { username, password }  
  )

  if (
    !loginResponse.success
    || loginResponse.status >= 400
    || !get(loginResponse, 'payload.token')
  ) {
    const formErrors = {
      username: get(loginResponse, 'payload.username'),
      password: get(loginResponse, 'payload.password'),
    }

    if (some(formErrors)) {
      return { success: false, formError: true, formErrors };
    }

    return { success: false, networkError: true };
  }

  return { success: true, token: loginResponse.payload.token };
}
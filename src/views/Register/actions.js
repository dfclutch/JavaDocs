import { get, some } from "lodash";
import { fetchWithoutToken } from "../../utilities/fetch";

export async function registerUser({
  username,
  password,
  password2
}) {
  const registrationResponse = await fetchWithoutToken(
    '/users/register/',
    'POST',
    { username, password, password2}  
  )

  if (
    !registrationResponse.success
    || registrationResponse.status >= 400
  ) {
    const formErrors = {
      username: get(registrationResponse, 'payload.username'),
      password: get(registrationResponse, 'payload.password'),
      password2: get(registrationResponse, 'payload.password2'),
    }

    if (some(formErrors)) {
      return { success: false, formError: true, formErrors };
    }

    return { success: false, networkError: true };
  }

  return { success: true };
}
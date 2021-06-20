function buildUrl(path) {
  return `https://7yyjt1sy8h.execute-api.us-east-1.amazonaws.com/dev${path}`;
}

export function fetchWithoutToken(path, method, data) {
  const fetchOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  };

  return fetch(buildUrl(path), fetchOptions)
    .then((res) => {
      return res.json().then((payload) => ({
          success: res.ok,
          status: res.status,
          payload
      }));
    })
    .catch((err) => {
      return { success: false, reason: err };
    });
}

export async function fetchWithToken(path, method, data) {
  const token = await localStorage.get('token');
  if (!token) return { success: false, reason: 'missing auth token' };
  const fetchOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  };

  fetch(buildUrl(path), fetchOptions)
    .then((res) => {
      return res.json().then((results) => {
        return {
          success: res.ok,
          status: res.status,
          results
        };
      });
    })
    .catch((err) => {
      return { success: false, reason: err };
    });
}
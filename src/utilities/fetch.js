export function fetchWithoutToken(url, method, data) {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
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

export async function fetchWithToken(url, method, data) {
  const token = await localStorage.get('token');
  if (!token) return { success: false, reason: 'missing auth token' };

  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
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
// MAKE REQUEST TO THE SERVER
export function makeRequest(url, endpoint, method) {
  const headers = {
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28',
    Accept: 'application/vnd.github+json',
  };
  const config = { method, headers };
  return fetch(`${url}${endpoint}`, config).then((res) => {
    const result = res.json();
    return res.ok
      ? result
      : result.then((err) => Promise.reject(`${err.message}`));
  });
}

// GET PAGES COUNTER
export function getPageCount(totalCount, limit) {
  return Math.ceil(totalCount / limit);
}

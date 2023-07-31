// MAKE REQUEST TO THE SERVER
export function makeRequest(url, endpoint, method, query, order, page = 1) {
  const headers = {
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28',
    Accept: 'application/vnd.github+json',
  };
  let serverUrl;
  if (order) {
    serverUrl = `${url}${endpoint}?q=${query}&page=${page}&per_page=36${`&sort=repositories&order=${order}`}`;
  } else {
    serverUrl = `${url}${endpoint}?q=${query}&page=${page}&per_page=36`;
  }
  const config = { method, headers };
  return fetch(serverUrl, config).then((res) => {
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

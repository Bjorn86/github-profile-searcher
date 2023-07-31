// IMPORT UTILS
import { makeRequest } from './utils';

// IMPORT VARIABLES
import { API_URL } from './constants';

// SEARCH USERS
export function searchUsers(query, index, page = 1) {
  let endpoint;
  if (index === 1) {
    endpoint = `/search/users?q=${query}&page=${page}&per_page=36&sort=repositories&order=desc`;
  } else if (index === 2) {
    endpoint = `/search/users?q=${query}&page=${page}&per_page=36&sort=repositories&order=asc`;
  } else {
    endpoint = `/search/users?q=${query}&page=${page}&per_page=36`;
  }
  return makeRequest(API_URL, endpoint, 'GET');
}

// GET USER
export function getUser(userName) {
  return makeRequest(API_URL, `/users/${userName}`, 'GET');
}

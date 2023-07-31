// IMPORT UTILS
import { makeRequest } from './utils';

// IMPORT VARIABLES
import { API_URL } from './constants';

// SEARCH USERS
export function searchUsers(query, index, page) {
  let order;
  if (index === 1) {
    order = 'desc';
  } else if (index === 2) {
    order = 'asc';
  } else {
    order = false;
  }
  return makeRequest(API_URL, '/search/users', 'GET', query, order, page);
}

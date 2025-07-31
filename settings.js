const API_CONFIG = {
  BASE_URL: 'http://192.168.137.1:8000',
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

export default API_CONFIG;

export const { BASE_URL, TIMEOUT, HEADERS } = API_CONFIG;
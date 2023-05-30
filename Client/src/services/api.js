// services/api.js
const BASE_URL = "http://localhost:8080";

async function apiRequest(endpoint, method = "GET", data = null) {
  const url = `${BASE_URL}${endpoint}`;
  const options = {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  };

  const response = await fetch(url, options);

  const responseData = await response.json();

  return responseData;
}

export default apiRequest;

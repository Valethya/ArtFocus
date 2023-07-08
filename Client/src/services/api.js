import BASE_URL from "../config";

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
  console.log(responseData);
  return responseData;
}

export default apiRequest;

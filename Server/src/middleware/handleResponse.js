function handleResponse(res, payload, status = 500) {
  let response = {};
  if (status === 200 || status === 201 || status === 204) {
    response = {
      status: "success",
      data: payload,
      statusCode: status,
    };
  }
  return res.status(status).json(response);
}

export default handleResponse;

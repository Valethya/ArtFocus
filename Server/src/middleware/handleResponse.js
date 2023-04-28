function handleResponse(res, payload, code = 500) {
  let response = {};
  if (code === 200 || code === 201 || code === 204) {
    response = {
      code: "success",
      data: payload,
      statusCode: code,
    };
  }
  return res.status(code).json(response);
}

export default handleResponse;

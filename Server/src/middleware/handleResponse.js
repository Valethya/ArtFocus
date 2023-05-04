function handleResponse(res, payload, code = 200) {
  let response = {};
  if (code === 200 || code === 201 || code === 204) {
    response = {
      code: "success",
      data: payload,
      statusCode: code,
    };
  }
  console.log(response);
  return res.status(code).json(response);
}

export default handleResponse;

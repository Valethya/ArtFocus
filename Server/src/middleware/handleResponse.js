function handleResponse(res, payload, code = 200) {
  let response = {};
  if (code === 200 || code === 201) {
    response = {
      status: "success",
      data: payload,
      statusCode: code,
    };
  }
  console.log(response, " en el hanlde!!!");
  return res.status(code).json(response);
}

export default handleResponse;

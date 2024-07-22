export function createResponse(res, data, status = 200, message = "Success") {
  return res.status(status).json({
    status,
    message,
    data,
  });
}

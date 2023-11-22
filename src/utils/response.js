export function createResponse(res, data, status = 200, message = "Success") {
  res.status(status).json({
    status,
    message,
    data,
  });
}

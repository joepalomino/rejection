export function formatRequest(requestObj = {}) {
  const { request, from, timeStamp, value, id, result } = requestObj;
  return {
    id,
    request,
    from,
    timeStamp,
    value,
    result
  };
}

export function generateUID() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

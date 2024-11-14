const handleError = (error, req, res, next) => {
  const { status, errorContent, message } = error;
  console.log("capturando el error");
  res.status(status).json({
    message,
    error: errorContent.message,
  });
};

module.exports = handleError;

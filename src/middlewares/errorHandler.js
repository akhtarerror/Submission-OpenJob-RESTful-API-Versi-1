const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.isJoi) {
    return res.status(400).json({
      status: 'failed',
      message: err.details[0].message,
    });
  }

  if (err.status) {
    return res.status(err.status).json({
      status: err.status < 500 ? 'failed' : 'failed',
      message: err.message,
    });
  }

  res.status(500).json({
    status: 'failed',
    message: 'Internal Server Error',
  });
};

module.exports = errorHandler;
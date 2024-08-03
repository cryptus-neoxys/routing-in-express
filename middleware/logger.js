const logger = (req, res, next) => {
  // TODOs:
  // 1. log timestamp
  // 2. log req.url
  // 3. log req.body
  console.log({
    timestamp: new Date().toTimeString(),
    url: req.url,
    method: req.method,
    body: req.body,
  });
  // call next()
  next();
};

module.exports = {
  logger,
};

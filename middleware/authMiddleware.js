const checkAuth = (req, res, next) => {
  // You can add token or session check here
  console.log('Checking Auth...');
  next();
};

module.exports = checkAuth;

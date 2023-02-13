const withAuth = (req, res, next) => {
  if (!req.session.logged_in && 
    !(req.path.includes('login') || 
    req.path.includes('signup') || 
    req.path === '/')) {
      res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;

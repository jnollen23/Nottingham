const withAuth = (req, res, next) => {
  if (!req.session.logged_in &&
    !(//Any pages added to the site that should not be authenicated should be added to this list
      req.path.includes('login') ||
      req.path.includes('signup') ||
      req.path === '/' ||
      req.path.includes('images')
    )) {
    res.redirect('/');
  } else {
    next();
  }
};

module.exports = withAuth;

// ! req.isAuthenticated() 이런거는 passport에서 다 제공

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    // ! 여기서 true가 되면 return, false가 되면 user/login으로
    // console.log('ensure: ', req.isAuthenticated());
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  },
  forwardAuthenticated: function(req, res, next) {
    // ! 여기서 false가 된 후 return으로 끝나고 만약 true가 되면 /dashboard로 간다
    // console.log('forward: ', req.isAuthenticated());
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }
};

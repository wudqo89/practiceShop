const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) =>
  res.render('home', {
    title: 'RatedGreen'
  })
);

// aboutus
router.get('/aboutus', (req, res) =>
  res.render('aboutus', {
    // index.handlebars에 {{title}} 바인딩
    title: ' AboutUs : RatedGreen'
  })
);

router.get('/globalretailers', (req, res) =>
  res.render('globalretailers', {
    // index.handlebars에 {{title}} 바인딩
    title: 'GlobalRetailers : RatedGreen'
  })
);

router.get('/review', (req, res) =>
  res.render('review', {
    // index.handlebars에 {{title}} 바인딩
    title: 'Review : RatedGreen'
  })
);

router.get('/community', (req, res) =>
  res.render('community', {
    // index.handlebars에 {{title}} 바인딩
    title: 'Community : RatedGreen'
  })
);

// Dashboard
// router.get('/dashboard', ensureAuthenticated, (req, res) =>
//   res.render('dashboard', {
//     // ! req.user로 email, name 등 접근가능
//     // ! dashboard.ejs에서 사용가능
//     name: req.user.name
//   })
// );

module.exports = router;

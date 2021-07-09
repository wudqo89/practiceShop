const express = require('express');
const router = express.Router();

router.get('/scalppack', (req, res) =>
  res.render('lines/scalppack', {
    // index.handlebars에 {{title}} 바인딩
    title: 'ScalpPack : RatedGreen'
  })
);
router.get('/realshea', (req, res) =>
  res.render('lines/realshea', {
    // index.handlebars에 {{title}} 바인딩
    title: 'RealShea : RatedGreen'
  })
);
router.get('/realmary', (req, res) =>
  res.render('lines/realmary', {
    // index.handlebars에 {{title}} 바인딩
    title: 'RealMary : RatedGreen'
  })
);

module.exports = router;

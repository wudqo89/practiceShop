const express = require('express');
const router = express.Router();

router.get('/all', (req, res) =>
  res.render('products/all', {
    // index.handlebars에 {{title}} 바인딩
    title: 'OnlineShop : 전체제품'
  })
);

module.exports = router;

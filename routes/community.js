const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('../models/Board');
const Board = mongoose.model('Board');

router.get('/contactus', (req, res) =>
  res.render('community/contactus', {
    title: 'Community : ContactUs',
    contentTitle: 'CONTACT US',
    contentSubTitle: '제휴, 문의사항'
  })
);
router.get('/notice', (req, res) =>
  res.render('community/notice', {
    title: 'Community : Notice',
    contentTitle: 'NOTICE',
    contentSubTitle: '레이티드 그린 공지사항'
  })
);

// https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is
// handlebar 에러가 나서 lean()을 사용 (lean은 POJO  plain old JavaScript objects) - plain JSON을 받아오기 위함
router.get('/qna', (req, res) => {
  // https://m.blog.naver.com/PostView.nhn?blogId=azure0777&logNo=220746283352&proxyReferer=https%3A%2F%2Fwww.google.com%2F
  // https://www.youtube.com/watch?v=mARc0pOX4i0

  // pagination
  var page = Math.max(1, req.query.page);
  var limit = 1;

  // count()는 deprecated, countDocuments()를 사용 할 수도 있지만 MongoDB를 always full collection scan이라서 덜 추천
  Board.estimatedDocumentCount({}, function(err, count) {
    if (err) return res.json({ success: false, message: err });
    let skip = (page - 1) * limit;
    let maxPage = Math.ceil(count / limit);
    Board.find({})
      .lean()
      .populate('_id')
      .sort({ date: 'desc' })
      .skip(skip)
      .limit(limit)
      .exec(function(err, posts) {
        if (err) return res.json({ success: false, message: err });
        res.render('community/qna', {
          title: 'Community : QnA',
          contentTitle: 'Q&A',
          contentSubTitle: '레이티드 그린 Q&A',
          posts: posts,
          user: req.user,
          page: page,
          maxPage: maxPage
          // postsMessage: req.flash('postsMessage')[0]
        });
      });
  });

  // Board.find({})
  //   .lean()
  //   .sort({ date: 'desc' })
  //   .then(posts => {
  //     res.render('community/qna', {
  //       title: 'Community : QnA',
  //       contentTitle: 'Q&A',
  //       contentSubTitle: '레이티드 그린 Q&A',
  //       posts: posts
  //     });
  //   });
});

// add post
router.get('/qna/editor', (req, res) =>
  res.render('community/editor', {
    title: 'Community : Editor'
  })
);

// process (editor.hbs action > /qna)
router.post('/qna', (req, res) => {
  // console.log('re', req.body);
  // res.send('ok');

  const { title, user, details } = req.body;

  let errors = [];

  if (!title || !user || !details) {
    errors.push({ msg: '모두 작성 해주세요' });
  }

  // if you have errors
  if (errors.length > 0) {
    res.render('community/editor', {
      errors: errors,
      title: title,
      user: user,
      details: details
    });
  } else {
    // res.send('passed');
    const newPost = {
      title: title,
      user: user,
      details: details
      // id: req.user.id
    };
    new Board(newPost).save().then(post => {
      req.flash('success_msg', '글이 추가되었습니다');
      console.log('newPost', post);
      res.redirect('/community/qna');
    });
  }
});

router.get('/qna/:id', (req, res) => {
  // console.log(req.params.id);
  Board.findOne({
    _id: req.params.id
  })
    .lean()
    .then(post => {
      console.log('enterPost: ', post);
      res.render('community/post', {
        title: 'Community : QnA',
        contentTitle: 'Q&A',
        contentSubTitle: '레이티드 그린 Q&A',
        post: post
      });
    });
});

router.get('/faq', (req, res) =>
  res.render('community/faq', {
    title: 'Community : FAQ',
    contentTitle: 'FAQ',
    contentSubTitle: '레이티드 그린 자주묻는 질문사항'
  })
);

module.exports = router;

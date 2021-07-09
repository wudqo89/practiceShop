const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { check, matchedData, validationResult } = require('express-validator');

// Load User model
const User = require('../models/User');

// Login Page
router.get('/login', (req, res) =>
  res.render('users/login', { title: '로그인' })
);

// Register Page
router.get('/register', (req, res) =>
  res.render('users/register', { title: '회원가입' })
);

// 정규표현식
// https://epthffh.tistory.com/entry/%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8-%EC%A0%95%EA%B7%9C%EC%8B%9D
// Register
router.post(
  '/register',
  [
    check('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email을 알맞게 입력해주세요.')
      .custom(async (value, { req, next }) => {
        try {
          const exUser = await User.findOne({ email: req.body.email });
          if (exUser) {
            // throw new Error('이미 사용 중인 이메일 입니다');
            return Promise.reject('이미 사용 중인 이메일 입니다');
          }
          // Indicates the success of this synchronous custom validator
          // return true;
          // console.log('user: ', user);
          // if (user) {
          //   console.log('Promise: ', Promise);
          //   throw Promise.reject('이미 사용 중인 E-mail 입니다');
          // }
        } catch (error) {
          console.log('errorTry:', error);
          return next(error);
        }

        // console.log('User: ', User);
        // return User.findUserByEmail(value).then(user => {
        //   if (user) {
        //     console.log('user: ', user);
        //     // return Promise.reject('이미 사용 중인 E-mail 입니다');
        //     throw new Error('이미 사용 중인 E-mail 입니다');
        //   }
        // });
      }),
    check('password')
      .isLength({ min: 8, max: 16 })
      .matches(/^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/)
      .trim()
      .withMessage(
        '특수문자, 문자, 숫자인 8~16자, 비밀번호를 알맞게 입력해주세요'
      ),
    check('passwordConfirm').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('비밀번호가 일치하지 않습니다');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    })
  ],
  async (req, res, next) => {
    // console.log('req.body: ', req.body);
    // res.send('hello');
    const {
      userType,
      userId,
      password,
      passwordConfirm,
      passwordQuestion,
      passwordAnswer,
      name,
      postCode,
      address,
      detailedAddress,
      email,
      phone,
      agreeServiceChecked,
      agreePrivacyChecked,
      agreeSms,
      agreeEmail
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(422).json({ errors: errors.array() });
      // User.findOne({ email: email }).then(user => {
      // if (user) {
      // errors.push({ msg: '이미 사용 중인 Email입니다' });
      // console.log('user: ', user);
      // }
      // });
      res.render('users/register', {
        errors: errors.mapped(),
        userType,
        userId,
        password,
        passwordConfirm,
        passwordQuestion,
        passwordAnswer,
        name,
        postCode,
        address,
        detailedAddress,
        email,
        phone,
        agreeServiceChecked,
        agreePrivacyChecked,
        agreeSms,
        agreeEmail
      });
      console.log('errors: ', errors);

      // end: !errors.isEmpty()
    } else {
      // ! User.js(스키마)에서 unique 속성은 한개만 있어야한다. userId,email 둘다 있으면 에러 생김
      const newUser = new User({
        userType,
        userId,
        password,
        // passwordConfirm,
        passwordQuestion,
        passwordAnswer,
        name,
        postCode,
        address,
        detailedAddress,
        email,
        phone,
        agreeServiceChecked,
        agreePrivacyChecked,
        agreeSms,
        agreeEmail
      });

      // https://hyunseob.github.io/2016/05/09/assert-nodejs-test-module/
      // https://www.w3schools.com/nodejs/met_assert_equal.asp
      // newUser.validate().catch(error => {
      //   console.log('assert: ', assert);
      //   console.log('newUserError: ', error);
      //   assert.ok(error);
      //   assert.equal(error.errors['email'].message, 'Email validation failed');
      // });

      // Hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          // Set password to hashed
          newUser.password = hash;

          // Save user
          newUser
            .save()
            .then(user => {
              // req.flash('success_msg', 'You are now registered and can log in');
              res.redirect('/users/login');
            })
            .catch(err => console.log(err));
        });
      });
    }

    // res.status(202).json({ success: 'ok' });

    /*
    User.findOne({ email: email }).then(user => {
      if (user) {
        res.render('users/register', {
          errors,
          userType,
          userId,
          password,
          passwordConfirm,
          passwordQuestion,
          passwordAnswer,
          name,
          postCode,
          address,
          detailedAddress,
          email,
          phone,
          agreeServiceChecked,
          agreePrivacyChecked,
          agreeSms,
          agreeEmail
        });
      } else {
        const newUser = new User({
          userType,
          userId,
          password,
          passwordConfirm,
          passwordQuestion,
          passwordAnswer,
          name,
          postCode,
          address,
          detailedAddress,
          email,
          phone,
          agreeServiceChecked,
          agreePrivacyChecked,
          agreeSms,
          agreeEmail
        });

        // Hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set password to hashed
            newUser.password = hash;
            // Save user
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    }); // end: User.findOne
    */
  }
);

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;

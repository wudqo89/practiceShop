// https://mongoosejs.com/docs/schematypes.html

// 스키마에서 validation 쓰자
// https://stackoverflow.com/questions/16882938/how-to-check-if-that-data-already-exist-in-the-database-during-update-mongoose/33986969

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userType: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
    // index: {
    // this makes email unique. (mongoose-unique validator)
    // unique: true
    // },
    // validate: {
    // validator: () => {
    // Promise.resolve(false);
    // },
    // message: '이미 사용 중인 Email입니다'
    // validator: function(v, cb) {
    //   console.log('v: ', v, 'cb: ', cb);
    //   User.find({ email: v }, function(err, docs) {
    //     cb(docs.length === 0);
    //   });
    // }
    // message: '이미 사용 중인 Email입니다'
    // }
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  passwordConfirm: {
    type: String
  },
  passwordQuestion: {
    type: String,
    required: true,
    default: 'question_1'
  },
  passwordAnswer: {
    type: String,
    required: true
  },
  postCode: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  detailedAddress: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  agreeServiceChecked: {
    type: Boolean,
    required: true
  },
  agreePrivacyChecked: {
    type: Boolean,
    required: true
  },
  agreeSms: {
    type: Boolean,
    default: false
  },
  agreeEmail: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

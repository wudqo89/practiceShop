// https://thebook.io/006982/ch08/06/02-02/

const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
  Types: { ObjectId }
} = Schema;

// ref: User 스키마의 ObjectId가 들어간다는 의미 (JOIN 기능)
const commentSchema = new Schema({
  commenter: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  comment: {
    type: String,
    required: true
  },
  hits: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ! mongoose에서는 DB에 Collection 이름을 소문자교체+복수형 으로 자동 생성한다. (Comment.js라면 comments 생성), 이것을 comment_table같이 맘대로 변경 가능
const User = mongoose.model('Comment', commentSchema, 'comment_table');

module.exports = User;

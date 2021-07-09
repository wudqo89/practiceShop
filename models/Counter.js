// https://cnpnote.tistory.com/entry/MONGODB-%EB%AA%BD%EA%B5%AC%EC%8A%A4-%EC%9E%90%EB%8F%99-%EC%A6%9D%EA%B0%80

// https://cnpnote.tistory.com/entry/MONGODB-%EB%AA%BD%EA%B5%AC%EC%8A%A4-%EB%8F%85%ED%8A%B9%ED%95%9C-%EC%9E%90%EB%8F%99-%EC%A6%9D%EA%B0%80-%ED%95%84%EB%93%9C-%EB%A7%8C%EB%93%A4%EA%B8%B0

// 1번 제안
const mongoose = require('mongoose');
const { Schema } = mongoose;

const CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

module.exports = mongoose.model('Counter', CounterSchema);

// 이코드는 mongoose.model('Board', BoardSchema) 다음에 와야함, 왜냐면 스키마가 만들어지고 난 다음에 와야해서
// BoardSchema.pre('save', function(next) {
//   var doc = this;
//   Counter.findByIdAndUpdate({ _id: 'entityId' }, { $inc: { seq: 1 } }, function(
//     error,
//     Counter
//   ) {
//     if (error) {
//       return next(error);
//     }
//     doc.testId = Counter.seq;
//     next();
//   });
// });

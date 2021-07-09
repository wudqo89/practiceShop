// https://kb.objectrocket.com/mongo-db/how-to-join-collections-using-mongoose-228

// https://stackoverflow.com/questions/36805784/how-to-join-two-collections-in-mongoose

// ! notice, faq 다 연결시키자

const mongoose = require('mongoose');
const { Schema } = mongoose;
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
});
autoIncrement.initialize(connection);

// Using Schema constructor, create a BoardSchema
const BoardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  // hits: {
  //   type: Number
  // },
  date: {
    type: Date,
    default: Date.now
  }
  // review: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Review'
  // }
});

BoardSchema.plugin(autoIncrement.plugin, 'Board');
// Create model from the schema
module.exports = connection.model('Board', BoardSchema);

const express = require('express');
// path는 html file directory를 지정하기 위해
const path = require('path');
// const logger = require('./middleware/logger');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
// connect-flash는 express-session과 cookie-parser를 사용함으로 뒤로 배치
const flash = require('connect-flash');
// https://www.npmjs.com/package/express-handlebars
// ! directory 구조 설정법
// https://github.com/ericf/express-handlebars/tree/master/examples
const exphbs = require('express-handlebars');

const app = express();

// Passport Config
require('./config/passport')(passport);
// 아래 process.env.변수명 으로 접근가능
require('dotenv/config');

// Map global promise - get rid of warning
// mongoose.Promise = global.Promise;

// DB
// { dbName: 'shoppingAdmin' },
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('**connected to DB**'))
  .catch(err => console.log(err));

// *Handlebars Middleware
const hbs = exphbs.create({
  defaultLayout: 'index',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
    changeDateFormat: function(dateNow) {
      // let currentDatetime = new Date();
      // Board.js 스키마의 Date.now를 활용
      let currentDatetime = dateNow;
      let currentMonth = currentDatetime.getMonth() + 1;
      let changedMonth = currentMonth <= 10 ? '0' + currentMonth : currentMonth;
      let formattedDate =
        currentDatetime.getFullYear() +
        '-' +
        changedMonth +
        '-' +
        currentDatetime.getDate();
      return formattedDate;
    },
    pagination: function(maxPage) {
      const offset = 3;
      for (i = 1; i <= maxPage; i++) {
        if (
          i <= offset ||
          i > maxPage - offset ||
          (i >= page - (offset - 1) && i <= page + (offset - 1))
        ) {
          return `<li class="waves-effect"><a href="/community/qna?page=${i}">${i}</a></li>`;
        } else if (i == offset + 1 || i == maxPage - offset) {
          return `<li class="waves-effect"><a href="#!">?</a></li>`;
        }
      }
    }
  }
});

// main.handlebar 파일 만들면 그게 defaultlayout이 된다.
// app.engine('handlebars', exphbs({ defaultLayout: 'index' }));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middlewars
// Cross Origin Resource Sharing, 같은 포트, 도메인 요청시 정책위반인데, 이를 해결시켜주는 미들웨어
// app.use(cors());

// *Body Parser Middleware
// 이게 있어야 req.body를 사용 할 수 있다.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// *Set static folder
// ! public에 있는 모든 파일 폴더가 알아서 연결되게한다. (res.sendFile로 별도 연결할 필요없음)
// ! __dirname : 해당디렉토리/traversy_express/public/ 이기 때문에 index.html이 자동으로 잡힌다.
app.use(express.static(path.join(__dirname, 'public')));

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  // res.locals.error_msg = req.flash('error_msg');
  // res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// *Route
// ! 만약 handlebars를 이용한 이 코드에서 get을 안하면 public 폴더가 연결됨
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users.js'));
app.use('/lines', require('./routes/lines.js'));
app.use('/products', require('./routes/products.js'));
app.use('/community', require('./routes/community.js'));
// 이거 대신 router로 연결
// app.get('/', (req, res) =>
//   res.render('home', {
//     // index.handlebars에 {{title}} 바인딩
//     title: 'RatedGreen',
//     members
//   })
// );

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

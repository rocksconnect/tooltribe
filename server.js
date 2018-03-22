import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import loggerfrom from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from './core/logger/app.logger';
import config from './core/config/config.dev';
import connectToDb from './db/connect';
import usertype from './routes/usertype.router.js';
import user from './routes/user.router.js';
import userservice from './service/user.service.js';
import index from './routes/index.router.js';
import net from 'net';
import cors from 'cors';
import jwt from 'jsonwebtoken'


const port = config.serverPort;
logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

async function connectToMongo(){
    var data = await connectToDb();
    userservice.RegisterSuperAdmin(config.superAdminLoginDetails);
    console.log(data)
}
connectToMongo();


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(loggerfrom('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(cors())

var loginRequired = function(req, res, next) {
  if (req.user) {
    console.log("222 jj")
    next();
  } else {
    return res.status(401).json({ success:false, code:401, msg: 'Unauthorized user!' });
  }
};

var tokenExpired = function(req, res, next) {
  
  return res.status(200).json({ success:false, code:419, msg: 'Token expires, Please login!!' });
  
};

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if(req.url == '/login' || req.url == '/register' || req.url == '/account_email_validation' || req.url == '/forgetPassword' || req.url == '/forgetPasswordReset' || req.url == '/' || req.url == '/terms' || req.url == '/privacy' || req.url == '/aboutus' || req.url == '/support' || req.url == '/changePassword'){
      
        next()
    }else{
        if(req.headers && req.headers.authorization ){
          jwt.verify(req.headers.authorization, "shhhhh", function(err,decode){
             console.log(err,decode,"err decode")
              if(err){
                req.user = undefined;
                if(err.name == "TokenExpiredError"){
                  tokenExpired(req, res, next)
                }else{
                  loginRequired(req, res, next);
                }
              }else{
              console.log(req.user)
                req.user = decode;
                loginRequired(req, res, next);
              }
          } )

        }else{
              req.user = undefined;
              loginRequired(req, res, next);
        }
        
    }
})

app.use(index);

app.use(usertype);
app.use(user);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = 3030;
const ADDRESS = '0.0.0.0';

/*let server = net.createServer(deviceTrackerHistoryService.onClientConnected);
server.listen(PORT, ADDRESS);
console.log(`socket started at: ${ADDRESS}:${PORT}`);
*/
app.listen(port, () => {
    logger.info('server started - ', port);
});

module.exports = app;

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
import trade from './routes/trade.router.js';
import category from './routes/category.router.js';
import idProofType from './routes/idProofType.router.js';

import brand from './routes/brand.router.js';
import tool from './routes/tool.router.js';

import userservice from './service/user.service.js';
import index from './routes/index.router.js';
import company from './routes/company.router.js';
import net from 'net';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import fileUpload from 'express-fileupload';

console.log('1213');

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
app.use(fileUpload());

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
//app.use('/public',express.static(path.join(__dirname, 'public')));



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


    if(req.url == '/getAllList' || req.url == '/allIdProof' || req.url == '/getCompany' || req.url == '/updateIdProofType' || req.url == '/getTrade' || req.url == '/login' || req.url == '/userLogin' || req.url == '/register' || req.url == '/account_email_validation' || req.url == '/forgetPassword' || req.url == '/forgetPasswordReset' || req.url == '/' || req.url == '/terms' || req.url == '/privacy' || req.url == '/aboutus' || req.url == '/support' || req.url == '/getCategory'){

        if(req.headers && req.headers.authorization && req.headers.authorization == 'Key@123'){
            next()
        }else{
            req.user = undefined;
            loginRequired(req, res, next);
        }
        
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

// default options - use for file uplaod
app.post('/upload', function(req, res) {
    console.log(1,req.body)
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
 
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('images/filename.jpg', function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});

app.use(index);
app.use(usertype);
app.use(user);
app.use(trade);
app.use(category);
app.use(idProofType);
app.use(brand);
app.use(tool);
app.use(company);

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

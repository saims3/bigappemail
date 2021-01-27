var express=require('express');
var mongoose=require('mongoose');
var bodyparser=require('body-parser');
var cors= require('cors');
var app=express();
mongoose.Promise = global.Promise;
//var sessionStrorage = require('express-session');
const route=require('./routers/route');

mongoose.connect('mongodb://localhost:27017/email');

mongoose.connection.on('connected',()=>{
    console.log('mongodb connected 1444');
});

mongoose.connection.on('error',(err)=>{
  console.log('err');

});

const PORT=3000;

app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true })) ;

app.use('/api',route);
app.get('/',(req,res)=>{
    res.send('somechanges');
});

app.listen(PORT, ()=>{
    console.log('server has been started at port:' +PORT);

});

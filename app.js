const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
//const socketio = require('socket.io');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

app.set('port',3000);
let id;
let jsondata_h;
let jsondata_r;
let data;


app.post('/transfer', (req,res) => {
  id = req.body.key;
  data = req.body.value;

jsondata_h ={
  "version":"2.0",
  "template" : {
    "outputs": [
      {
        "simpleText": {
          "text": id
        }
      }
    ]
  }
};

jsondata_r ={
  "version":"2.0",
  "template" : {
    "outputs": [
      {
        "simpleText": {
          "text": data
        }
      }
    ]
  }
};


  console.log(`key : ${id}, value : ${data}`);
  res.send('1');
});

app.post('/height', (req, res) => {
  res.json(jsondata_h);
});

app.post('/risk', (req,res) => {
  res.json(jsondata_r);
});




app.listen(app.get('port'), ()=> {
  console.log(`port number is ${app.get('port')}`); 
 });










/*
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('connection success');
  socket.on('disconnect', () => {
    console.log('disconnect');
  });

  socket.on('msg', (data) => {
    console.log(data);
  })
});

app.post('/transfer', (req,res) => {
  let inputData;
  
  req.on('data', (data) => {
    inputData = JSON.parse(data);
  });

  req.on('end', () => {
    console.log(`user_id : ${inputData.user_id}, name: ${inputData.name}`);
  })
})
*/
/*
app.use((req, res) => {

  console.log('첫 번째 미들웨어 호출 됨');
  var approve ={'approve_id':'NO','approve_pw':'NO'};


  var paramId = req.body.id;
  var paramPassword = req.body.password;
  console.log('id : '+paramId+'  pw : '+paramPassword);

  //아이디 일치여부 flag json 데이터입니다.
  if(paramId == 'test01') approve.approve_id = 'OK';
  if(paramPassword == '123') approve.approve_pw = 'OK';

  res.send(approve);

});*/



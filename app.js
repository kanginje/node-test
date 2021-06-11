const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
//const socketio = require('socket.io');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

app.set('port',3000);
let key;
let value;

let data;

app.post('/transfer', (req,res) => {
  key = req.body.key;
  value = req.body.value;

  console.log(`key : ${key}, value : ${value}`);
  data = {key : value}
})


app.post('/location', (req, res) => {
  res.json(data);
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


app.listen(app.get('port'), ()=> {
  console.log(`port number is ${app.get('port')}`); 
 });

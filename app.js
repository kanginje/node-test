const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/keyboard', (req, res) => {
  const data1 = {'type': 'text'}
  res.json(data1);
});

let data2;

app.set('port',3000);

app.post('/message', (req, res) => {
  const question = req.body.userRequest.utterance;
  const goMain = '처음으로';
  
  if (question === '테스트') {
    data2 = {
      'version': '2.0',
      'template': {
	    'outputs': [{
	      'simpleText': {
	        'text': '테스트'
	      }
	    }],
	    'quickReplies': [{
	      'label': goMain,
	      'action': 'message',
	      'messageText': goMain
	    }]
      }
    }
  }
  res.json(data2);
});


let users = [

  {
    id: 1,
    name: 'alice'
  },

  {
    id: 2,
    name: 'bek'
  },
  {
    id: 3,
    name: 'chris'
  }
]

app.get('/users', (req, res) => {
   console.log('who get in here/users');
   res.json(users)
});

app.post('/post', (req, res) => {
   console.log('who get in here post /users');
   var inputData;
   req.on('data', (data) => {
     inputData = JSON.parse(data);
   });
   req.on('end', () => {
     console.log("user_id : "+inputData.user_id + " , name : "+inputData.name);
   });

   res.write("OK!");
   res.end();
});

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

});

app.listen(app.get('port'), ()=> {
 console.log("익스프레스로 웹 서버를 실행함 : "+ app.get('port')); 
});
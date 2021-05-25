const express = require('express');
const app = express();
const morgan = require('morgan')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

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

const WebSocket = require('./socket');

const server = app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

WebSocket(server);
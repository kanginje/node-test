const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/keyboard', (req, res) => {
  const data1 = {'type': 'text'}
  res.json(data1);
});

let data2;

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


app.post('/post', (req, res) => {
  var inputData;
  req.on('data', (data) => {
    inputData = JSON.parse(data);
  });
  req.on('end', () => {
    console.log(inputData);
  });
  res.write("OK!");
  res.end();
}); 

app.listen(3000, () => console.log('node on 3000'));
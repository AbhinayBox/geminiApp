const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const nodemon = require('nodemon');
const { GoogleGenerativeAI } = require('@google/generative-ai');
app.post('/getResponse', (req, res) => {
  console.log(req.body.question);
  const genAI = new GoogleGenerativeAI(
    'AIzaSyDpdQqyfjjd7gqEAa24XWt8q7qIwrijF9A'
  );
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  model
    .generateContent(req.body.question)
    .then((result) => {
      console.log(result.response.text());
      const response = result.response.text();
      res.status(200).json({
        response: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
app.get('*', (req, res) => {
  res.status(404).json({
    msg: 'bad request',
  });
});

module.exports = app;

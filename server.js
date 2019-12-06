const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const request = require('request');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

const languageTranslator = new LanguageTranslatorV3({
  version: '2019-04-02',
  iam_apikey: process.env.API_TRANSLATE, 
  url: 'https://gateway.watsonplatform.net/language-translator/api',
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  });
};

app.get('service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});

let tokenCache = [];

app.get('/token', async (req, res) => {
  // request authorisation token
  if (tokenCache.length) {
    res.send(tokenCache[0])
  } else {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    };

    const options = {
        url: 'https://iam.cloud.ibm.com/identity/token',
        method: 'POST',
        form: {
          grant_type: 'urn:ibm:params:oauth:grant-type:apikey',
          apikey: process.env.API_SPEECH
        },
        headers: headers
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            tokenCache.push(body)
            res.send(body);
        }
    }
    
    request(options, callback);
    }
  
});

app.post('/', (req, res) => {
  const { data, outputLanguage, inputLanguage } = req.body
  // translate data
  const translateParams = {
    text: data,
    model_id: inputLanguage.slice(0, 3) + outputLanguage
  }

  languageTranslator.translate(translateParams)
  .then(translationResult => {
    res.json(translationResult.translations[0].translation);
  })
  .catch(err => {
    console.log('error:', err);
  })
});

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const characters = require('./lib/characters.json');
const API_URL = 'http://superheroapi.com/api';
const TOKEN = process.env.SUPERHERO;

const utils = require('./lib/utils');

const buildUrl = id => [API_URL, TOKEN, id].join('/');

const app = express();
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('sample-node-api is up and running now');
});

app.get('/api/characters/all', (req, res) => res.json(characters));

app.get('/api/characters/:id', (req, res) => {
  console.log('id', req.params.id);
  console.log('url', buildUrl(req.params.id));
  if (!req.params.id) return res.sendStatus(400);
  fetch(buildUrl(req.params.id))
    .then(data => data.json())
    .then(resolved => {
      if (resolved.response === 'error') {
        return res.status(500).json(resolved.error);
      }
      const mappedResponse = utils.deepMapKeys(resolved, utils.camelCase);

      console.log('RESPONSE', mappedResponse);
      return res.json({ ...mappedResponse });
    })
    .catch(err => {
      console.log('ERR', err);
      return res.status(500).json(err);
    });
});

var port = 8082;
app.listen(port, function() {
  console.log('Server started on port  ' + port);
});

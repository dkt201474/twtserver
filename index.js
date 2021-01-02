const express = require('express');
const cors = require('cors');
const { PORT, API_KEY, API_SECRET, TOKEN_KEY, TOKEN_SECRET } = process.env;
const port = PORT || 4000;

const Twit = require('twit');

// ================ UTILS ======================
const app = express();
app.use(cors());

app.get('/timeline', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (!req.query || !req.query.user) return res.sendStatus(404);

  console.log(req.query);

  var twi = new Twit({
    consumer_key: API_KEY,
    consumer_secret: API_SECRET,
    access_token: TOKEN_KEY,
    access_token_secret: TOKEN_SECRET,
  });

  twi.get('statuses/user_timeline', { screen_name: req.query.user }, function (err, data, response) {
    if (err) {
      return res.sendStatus(404);
    }

    return res.json(data);
  });
});

app.listen(port, () => console.log('Express server is listening on port 4000!'));

const express = require('express');
const app = express();
const path = require('path');
const port =  process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080

app.use('*.js', (req, res, next) => {
  req.url = req.url + '.gz'
  res.setHeader('Content-Encoding', 'gzip')
  next()
})

// app.use(express.static(__dirname)); // Current directory is root
// app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root

app.get('/', (req, res) => {
  const path = __dirname + '/dist/' + 'index.html'
  res.sendFile(path, {})
})

app.get('/assets/img/:id', (req, res) => {
  const path = __dirname + '/dist/assets/img/' + req.params.id
  res.status(200).sendFile(path, {}, (err) => {
    if (err) return res.status(404).send('file not found');
  })
})

app.get('/:id', (req, res) => {
  if (req.params.id === 'webpack-dev-server.js.gz') {
    return res.status(404).send('not found')
  }
  const path = __dirname + '/dist/' + req.params.id
  res.status(200).sendFile(path, {}, (err) => {
    if (err) return res.status(404).send('file not found');
  })
})

app.listen(port);
console.log('Listening on port ' + port);

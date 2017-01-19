const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
const port =  process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080

// manually setting cors
app.use(cors)

//  manually sets Content encoding for js
//  and css files
app.use('*.js', (req, res, next) => {
  req.url = req.url + '.gz'
  res.setHeader('Content-Encoding', 'gzip')
  next()
})

// app.use('*.css', (req, res, next) => {
//   req.url = req.url + '.gz'
//   res.setHeader('Content-Encoding', 'gzip')
//   next()
// })

// app.use(express.static(__dirname)); // Current directory is root
// app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root

// servers raw index file
app.get('/', (req, res) => {
  const path = __dirname + '/dist/' + 'index.html'
  res.sendFile(path, {})
})

// servers static image files
app.get('/assets/img/:id', (req, res) => {
  const path = __dirname + '/dist/assets/img/' + req.params.id
  res.status(200).sendFile(path, {}, (err) => {
    if (err) return res.status(404).send('file not found');
  })
})

// map route to serve static css files
app.get('/assets/css/:id', (req, res) => {
  const path = __dirname + '/dist/assets/css/' + req.params.id
  res.status(200).sendFile(path, {}, (err) => {
    if (err) return res.status(404).send('file not found');
  })
})

// map route to serve static js files
app.get('/assets/js/:id', (req, res) => {
  const path = __dirname + '/dist/assets/js/' + req.params.id
  res.status(200).sendFile(path, {}, (err) => {
    if (err) return res.status(404).send('file not found');
  })
})

// serves files from root location after considering other routes 
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

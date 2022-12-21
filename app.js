const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

const userRoutes = require('./routes/user')
const postsRoutes = require('./routes/post')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/auth', userRoutes);
app.use('/api/content', postsRoutes);

app.use('/Images', express.static(path.join(__dirname, 'Images')));

app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
  next();
});

module.exports = app;
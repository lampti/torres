// BASE SETUP ===============================================

'use strict';

var express = require('express'),
    app     = express(),
    path    = require('path'),
    swig	  = require('swig');


// CONFIGURATION ============================================

app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);

app.use(express.static(path.join(__dirname, 'dist')));

// ROUTES ===================================================

app.use('/', require('./routes'));

// CREATE SERVER ============================================

var PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log('App started in port 3000');
});

module.exports = app;

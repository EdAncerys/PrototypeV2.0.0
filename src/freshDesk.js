const express = require('express');
const freshDesk = express();
const fetch = require('node-fetch');
require('dotenv').config();

freshDesk.get('/freshDeskTickets', async (req, res, next) => {
  // Testing Account
  const API_KEY = 'weUr7kNI1zueQZ66vOcl';
  const FD_ENDPOINT = 'newaccount1608116901000';
  // NDG Account
  // const API_KEY = 'jlPINkcvQ7DRkb6N9tZ';
  // const FD_ENDPOINT = 'ndgtechnologylimited';

  let PATH = '/api/v2/tickets';
  const URL = `https://${FD_ENDPOINT}.freshdesk.com/${PATH}`;
  const ENCODING_METHOD = 'base64';
  const AUTHORIZATION_KEY =
    'Basic ' + new Buffer.from(API_KEY + ':' + 'X').toString(ENCODING_METHOD);
  const defaultOptions = {
    method: 'GET',
    mode: 'cors',
    headers: {
      Authorization: AUTHORIZATION_KEY,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  try {
    await fetch(URL, defaultOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log('Loading FreshSDesk Data: ', data);
        res.json({ msg: data });
        // res.render('freshSales.html', { data: data });
      });
  } catch (error) {
    const errorMsg = error.message;
    // res.render('index', {});
    // res.redirect('error.html');
    console.log(errorMsg);
    res.json({ msg: errorMsg });
  }
  next();
});

module.exports = freshDesk;

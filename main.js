var http = require('http');

// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('welcome to intelex!');
// }).listen(8082);

// console.log('server is running on port 8082'); 	

const react = require('express');
const router = react.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:manuyashu@localhost:5432/companydata';
router.get('/',function(req,res,next){
  res.status(200).body('server is up');
});

/* GET home page. */
router.get('/customer', function (req, res, next) {
  res.send({ title: 'react' });
});

router.get('/orderdata', function (req, res, next) {
  res.render('index', { title: 'react' });
});

router.post('/customer', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = {
    cid: req.body.cid,
    cname: req.body.cname,
    phone: req.body.phone,
    mail: req.body.mail,
    addr: req.body.addr,
    oid: req.body.oid
  };
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO customer(cid, cname, phone, mail, addr, oid) values($1, $2, $3, $4, $5, $6)',
      [data.cid, data.cname, data.phone, data.mail, data.addr, data.oid], (err, res) => {
        if (err) {
          res.send(err)
        }
        res.send('done')
      });


  });
  // After all data is returned, close connection and return results
  //query.on('end', () => {
  //  done();
  //  return res.json(results);
  //});
  // res.send('successfully done');
});



router.post('/orderdata', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = { oid: req.body.oid, oname: req.body.oname, odate: req.body.odate, status: req.body.status };
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO orderdata(oid,oname,odate,status) values($1, $2, $3, $4)',
      [data.oid, data.oname, data.odate, data.status]);
    // SQL Query > Select Data
    //const query = client.query('SELECT * FROM items ORDER BY id ASC');
    // Stream results back one row at a time
    //query.on('row', (row) => {
    //results.push(row);
  });
  // After all data is returned, close connection and return results
  //query.on('end', () => {
  //done();
  //return res.json(results);
  //});
  res.send('successfully done');
});
router.get('/orderdata', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Select Data
    //const query = client.query('SELECT * FROM items ORDER BY id ASC;');
    // Stream results back one row at a time
    //query.on('row', (row) => {
    //results.push(row);
    // });
    // After all data is returned, close connection and return results
    //query.on('end', () => {
    //done();
    //return res.json(results);
    //});
  });
});
router.get('/customerDB', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM items ORDER BY id ASC;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});


module.exports = router;

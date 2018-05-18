router.post('/customer', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = {cid: req.body.cid, cname:req.body.cname, complete: false};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO customer(cid, cname, phone, mail, addr, oid) values($1, $2, $3, $4, $5)',
    [data.cid, data.cname, data.phone, data.mail, data.addr, data.oid ]);
	
	client.query('INSERT INTO orderdata(oid,oname,odate,status) values($1, $2, $3, $4)',
    [data.oid, data.oname, data.odate, data.status]);
    // SQL Query > Select Data
   // const query = client.query('SELECT * FROM items ORDER BY id ASC');
    // Stream results back one row at a time
    // Stream results back one row at a time
    //query.on('row', (row) => {
    //  results.push(row);
    
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });

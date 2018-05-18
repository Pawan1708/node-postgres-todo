const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:manuyashu@localhost:5432/companydata';
  const data = {text: 'pen1', complete: false};

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE orderdata(oid SERIAL PRIMARY KEY, oname VARCHAR(40) not null, odate date, status VARCHAR(40)');

const query = client.query(
  'CREATE TABLE customer(cid SERIAL PRIMARY KEY, cname VARCHAR(40) not null, phone VARCHAR(30), mail TEXT, addr VARCHAR(50), oid references orderdata(oid) ');


query.on('end', () => { client.end(); });
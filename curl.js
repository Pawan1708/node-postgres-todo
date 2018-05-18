curl -d text=manasa -X POST http://localhost:3000/savedata



  const data = {cid: req.body.cid, cname: req.body.cname, phone: req.body.phone, addr: req.body.addr, oid: req.body.oid};

curl -d "cid=6&cname=manasa&phone=9440549044&mail=manasadevarasetty810@gmail.com&addr=yashodharacastle&oid=1" -X POST http://192.168.188.1:3000/customer


curl -d "oid=1&oname=watch&odate=1/1/2018&status=pending" -X POST http://192.168.188.1:3000/orderdata


http methods
-------------
GET{request content in URL parameter}
POST{requst conentent in body}
delete{request conent in url parameter}
put{request conent in body}


Request(post/get/put/delete}
Header
Body


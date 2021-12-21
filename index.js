const express = require("express");
const fs = require('fs');
const mysql = require('mysql');
const { runInNewContext } = require("vm");
const credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
const connection = mysql.createConnection(credentials);

const app = express();
app.use(express.json());

//Setting up the options for the app


//Making sure a secure connection can be made
connection.connect(error => {
  if (error) {
    console.error(error);
    process.exit(1);
  } else {
      console.log("Connected")
  }
});

app.use((request, response, next) => {
  console.log('request')
  console.log(request)
  response.set('Access-Control-Allow-Origin', '*');
  next();
});

app.options('*', (request, response) => {
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  response.set('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  response.sendStatus(200);
});

//Tells the app to listen on port 5001
const port = 5001;
app.listen(port, () => {
  console.log(`We're live in port ${port}!`);
});

//Function to print out the data requested from the endpoint
function rowToCar(row){
  return {
    id: row.id,
    vin: row.vin,
    make: row.make,
    model: row.model,
    year: row.year,
    color: row.color,
    price: row.price,
    miles: row.miles,
    link: row.link,
  }
}

//Get request for the report html file
app.get ('/report.html', (request, response) => {
  response.sendFile (__dirname + "/report.html");
});

//Get request to get all the cars in the database
app.get('/car', (request, response) => {

  const query = 'SELECT * FROM car';
  connection.query(query, (error, rows) => {
    if (error) {
      response.status(500);
      response.json({
        ok: false,
        results: error.message,
      });
    } else {
      const reviews = rows.map(rowToCar);
      console.log("Get Works")
      response.json({
        ok: true,
        results: rows.map(rowToCar),
      });
    }
  });
});

//Get request to get all the cars in the database, sorted by price ascending
app.get('/car/price-asc', (request, response) => {
  const query = 'SELECT * FROM car ORDER BY price ASC';
  connection.query(query, (error, rows) => {
    if (error) {
      response.status(500);
      response.json({
        ok: false,
        results: error.message,
      });
    } else {
      const reviews = rows.map(rowToCar);
      console.log("Get Works")
      response.json({
        ok: true,
        results: rows.map(rowToCar),
      });
    }
  });
});

//Get request to get all the cars in the database, sorted by price descending
app.get('/car/price-desc', (request, response) => {

  const query = 'SELECT * FROM car ORDER BY price DESC';
  connection.query(query, (error, rows) => {
    if (error) {
      response.status(500);
      response.json({
        ok: false,
        results: error.message,
      });
    } else {
      const reviews = rows.map(rowToCar);
      console.log("Get Works")
      response.json({
        ok: true,
        results: rows.map(rowToCar),
      });
    }
  });
});
//car/make/:make
app.get('/make', (request, response) => {

  const query = 'SELECT DISTINCT make FROM car ORDER BY make ASC';
  connection.query(query, (error, rows) => {
    if (error) {
      response.status(500);
      response.json({
        ok: false,
        results: error.message,
      });
    } else {
      const reviews = rows.map(rowToCar);
      console.log("Get Works")
      response.json({
        ok: true,
        results: rows.map(rowToCar),
      });
    }
  });
});

app.get('/make/:make', (request, response) => {
  const parameters = request.params.make;

  const query = 'SELECT * FROM car WHERE make = ? ORDER BY model ASC';
  connection.query(query, parameters, (error, rows) => {
    if (error) {
      response.status(500);
      response.json({
        ok: false,
        results: error.message,
      });
    } else {
      const reviews = rows.map(rowToCar);
      console.log("Get Works")
      response.json({
        ok: true,
        results: rows.map(rowToCar),
      });
    }
  });
});

app.get('/car/miles', (request, response) => {

  const query = 'SELECT * FROM car ORDER BY miles ASC';
  connection.query(query, (error, rows) => {
    if (error) {
      response.status(500);
      response.json({
        ok: false,
        results: error.message,
      });
    } else {
      const reviews = rows.map(rowToCar);
      console.log("Get Works")
      response.json({
        ok: true,
        results: rows.map(rowToCar),
      });
    }
  });
});

app.get('/car/year', (request, response) => {

  const query = 'SELECT * FROM car ORDER BY year desc';
  connection.query(query, (error, rows) => {
    if (error) {
      response.status(500);
      response.json({
        ok: false,
        results: error.message,
      });
    } else {
      const reviews = rows.map(rowToCar);
      console.log("Get Works")
      response.json({
        ok: true,
        results: rows.map(rowToCar),
      });
    }
  });
});

//Get request to get the car in the database with the specified VIN
app.get('/car/:vin', (request, response) => {
  const parameters = request.params.vin;

  const query = 'SELECT * FROM car WHERE vin = ?';
  connection.query(query, parameters, (error, rows) => {
    if (error) {
      response.status(500);
      response.json({
        ok: false,
        results: error.message,
      });
    } else {
      const reviews = rows.map(rowToCar);
      console.log("Get Works")
      response.json({
        ok: true,
        results: rows.map(rowToCar),
      });
    }
  });
});

//Endpoint to add a car to the database
app.post('/car', (request, response) => {
  const parameters = [
    request.body.vin,
    request.body.make,
    request.body.model,
    request.body.year,
    request.body.color,
    request.body.price,
    request.body.miles,
    request.body.link,
  ];

  const query = 'INSERT INTO car(vin, make, model, year, color, price, miles, link) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, parameters, (error, result) => {
    if (error) {
      response.status(500);
      response.json({
        ok: false,
        results: error.message,
      });
    } else {
      console.log("Post Works")
      response.json({
        ok: true,
      });
    }
  });
});


//Endpoint to update the car with the specified VIN with the specified price
app.patch('/car/:vin', (request, response) => {
  console.log('in the patch')
  const parameters = [
    request.body.price,
    request.params.vin
  ];

  const query = 'UPDATE car SET price = ? WHERE vin = ?';
  connection.query(query, parameters, (error, result) => {
    if (error) {
	  response.status(404);
      response.json({
        ok: false,
        results: error.message,
      });
    } else {
      console.log("Update Works")
      response.json({
        ok: true,
      });
    }
  });
});


//Endpoint to delete the car with the specified VIN
app.delete('/car/:id', (request, response) => {
  const id = request.params.id;
  const delQuery = 'DELETE FROM car WHERE id = ?';
  const params = [id];
  connection.query(delQuery, params, (error, result) => {
    if (error) {
    response.status(404);
      response.json({
        ok: false,
        results: error.message,
      });  
    } else {
      console.log("Delete Works"),
      response.json({
        ok: true,
      });
    }
  });
});

// db.js

import path from "path";

const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

//use CORS to allow request from frontend
app.use(cors());

// Connect to the SQLite database
const db = new sqlite3.Database('C:/Users/ahmad/challenge/winedrops-coding-challenge/backend/db/winedrops.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// api to get revenue records from the database
 app.get('/api/sales/revenue', (req, res)=>{
  db.all('Select Rank() OVER(ORDER by sum(co.total_amount) desc) as RevenueRank, mw.name as WineName,mw.vintage as WineVintage,round(sum(co.total_amount),2) as Revenue  from customer_order co, wine_product wp,master_wine mw WHERE  mw.id=wp.master_wine_id AND co.wine_product_id=wp.id and co.status in ("dispatched","paid") GROUP by WineName,WineVintage Order by RevenueRank,WineName,WineVintage ASC', [], (err, rows) => {
    if (err) {
      throw err;
    }
   return res.json(rows);
    
});
});

//api to get no of bottles sold
app.get('/api/sales/bottles', (req, res)=>{
  db.all('Select Rank() OVER(ORDER by sum(co.quantity) desc) as BottleRank, mw.name as WineName, mw.vintage as WineVintage,sum(co.quantity) as BottleSold from customer_order co, wine_product wp,master_wine mw WHERE  mw.id=wp.master_wine_id AND co.wine_product_id=wp.id and co.status in ("dispatched","paid") GROUP by WineName, WineVintage Order by BottleRank,WineName, WineVintage ASC', [], (err, rows) => {
    if (err) {
      throw err;
    }
   return res.json(rows);
    
});
});

//api to get order count
app.get('/api/sales/orders', (req, res)=>{
  db.all('Select Rank() OVER(ORDER by count(co.id) desc) as OrderRank,  mw.name as WineName, mw.vintage as WineVintage,count(co.id) as OrderCount from customer_order co, wine_product wp,master_wine mw WHERE  mw.id=wp.master_wine_id AND co.wine_product_id=wp.id and co.status in ("dispatched","paid") GROUP by WineName ,WineVintage Order by OrderRank,WineName ,WineVintage ASC', [], (err, rows) => {
    if (err) {
      throw err;
    }
   return res.json(rows);
    
});
});



//start the server
app.listen(port, ()=>{
  console.log(`Server is running on http://localhost:${port}`)
})


// Close the database connection
// db.close((err) => {
//   if (err) {
//     console.error('Error closing the database:', err.message);
//   } else {
//     console.log('Database connection closed.');
//   }
// });

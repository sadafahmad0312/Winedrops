const { error } = require('console');
const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('../db/winedrops.db', (error)=>{
    if(error){
        console.error('Error Connecting databse', error.message)
    }else{
        console.log('Connected to the database')
    }
        
});

module.exports = db;
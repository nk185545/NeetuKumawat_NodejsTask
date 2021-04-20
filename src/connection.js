const sqlite3 = require('sqlite3').verbose();


// // close the database connection
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });

const path = require('path')
const dbPath = path.resolve(__dirname, 'nodejsProject.db')
console.log(dbPath)

let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error(err.message);
    }
    else console.log('Connected to the database.');
  });

module.exports = db
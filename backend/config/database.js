let mysql = require('mysql')

let connection = mysql.createConnection({
  // host: 'localhost',
  // user: 'root',
  // password: '',
  // database: 'kepegawaian_data',
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})

connection.connect(function (error) {
  if (!!error) {
    console.log(error)
  } else {
    console.log('Connection Succuessfully!')
  }
})

module.exports = connection

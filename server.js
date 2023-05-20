
const mongoose = require('mongoose');
const app = require('./app');

const DB_HOST = "mongodb+srv://Linsted:k2uxyQfnoguhSdb5@cluster0.x75ivqb.mongodb.net/db-contacts?retryWrites=true&w=majority"

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful")
    })
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  })




// pass:   k2uxyQfnoguhSdb5



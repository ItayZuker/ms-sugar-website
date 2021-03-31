const mongoose = require('mongoose')

let dburl = 'mongodb://localhost:27017/ms-sugar-website-local-host'
if ( process.env.REACT_APP_STORE_FRONT_DB_URL ) {
    dburl = process.env.REACT_APP_STORE_FRONT_DB_URL
}

mongoose.connect(dburl, {useNewUrlParser: true})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    console.log("mongoDb is connected")
})
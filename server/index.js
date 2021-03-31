const express = require('express');
const fileUpload = require('express-fileupload')
const getShopify = require('./routs/shopify.rout.js')
const app = express();
app.use(fileUpload())
require('./db.js');

const path = require('path')

app.set('json spaces', 2);

app.use(express.json());


app.use('/shopify', getShopify)

app.use('/', express.static(path.join(__dirname, '../client/build')))

app.use(express.static(__dirname))

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

let port = 8080
if(process.env.PORT) {
    port = process.env.PORT
}

app.listen(port, () => {
    console.log('server is running on port:' + port)
});
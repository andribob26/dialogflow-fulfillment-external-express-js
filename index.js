const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const router = require('./router/router');



app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json());

app.use(router)


app.listen(port, ()=>{
    console.log('==================================================');
    console.log(`server berjalan di port = http://localhost:${port}`);
    console.log('==================================================');
})
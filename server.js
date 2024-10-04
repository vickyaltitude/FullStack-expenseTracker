const express = require('express');
const path = require('path')
const app = express();
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));
const PORT = process.env.port || 3500;



const handle = require('./controller/handle.js');


app.get('/',handle.homePage)

app.get('/exp-details',handle.expDetails)

app.post('/add-user',handle.adsUser)

app.get('/edit-exp/:id',handle.editExp)

app.post('/edit-user/:id',handle.editUser)

app.get('/delete-exp/:id',handle.deleteExp)

app.listen(PORT,()=> console.log(`Server is running in port ${PORT}`))
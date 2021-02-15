const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost/tareas-database', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db => console.log('base de datos conectada'))
.catch(error => console.error(err));


//Settings
app.set('port', process.env.PORT || 3000);  





//Middlewares
app.use(morgan('dev'));
app.use(express.json()); //bodyParse ya viene en express




//Routes
app.use('/api/tareas', require('./routes/tareas'));



//Static files
app.use(express.static(__dirname + '/public'));


//server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})
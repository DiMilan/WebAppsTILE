const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./config/DB');

    const app = express();

    mongoose.Promise = global.Promise;
    mongoose.connect(config.DB).then(
      () => {console.log('Database connected') },
      err => { console.log('Database connection failed'+ err)}
    );
    const adUnitRoutes = require('./routes/adunit.route');
    const usersRoutes = require('./routes/users.route');

    app.use(bodyParser.json());
    app.use(cors()); 
    const port = process.env.PORT || 4000; //8080 voor heroku ??

    app.use('/adunits', adUnitRoutes);
    app.use('/users', usersRoutes);

    const server = app.listen(port, function(){
     console.log('Listening to port ' + port);
    });
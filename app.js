require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts')
const methodOverride = require('method-override')
const connectDB = require('./server/config/db')
const {isActiveRoute} = require('./server/helpers/routeHelpers')
const setCurrentRoute = require('./server/middleware/currentRoute');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
const port = process.env.PORT|| 3000;

console.log('MongoDB URI:', process.env.MONGO_URI);

connectDB();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));


app.use(session({
    secret :'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl : process.env.MONGO_URI
    }),
}));

app.use(express.static('public'))

//template engine
app.use(expressLayout)
app.set('layout', './layouts/main');
app.set('view engine','ejs')

app.locals.isActiveRoute = isActiveRoute;
app.use(setCurrentRoute);
app.use('/', require("./server/routes/main"))
app.use('/', require("./server/routes/admin"))
app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`)
})

// app.js or server.js

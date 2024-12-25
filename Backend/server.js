const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
// const fileUpload= require("express-fileupload");
const cookieParser = require('cookie-parser');
app.use(cookieParser());
dotenv.config();
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));


app.use(express.json({ limit: '100mb' })); // Increase limit for JSON payloads if necessary
app.use(express.urlencoded({ limit: '10mb', extended: false }))
app.use('/public', express.static('public')); // app.use(fileUpload());
const dbConnection= require('./db');
const router = require('./routes/UserRoutes');
const shopRouter = require('./routes/shopRoutes');
const productRoutes = require('./routes/productRotes')
const orderRoute = require('./routes/orderRoute')




dbConnection();



app.use('/',router);
app.use('/seller',shopRouter);
app.use('/product',productRoutes)
app.use('/order',orderRoute)

app.listen(process.env.PORT,()=>{
    console.log("server running at this ",process.env.PORT);
})

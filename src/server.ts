import express, { Request, Response } from  'express'
import dotenv from 'dotenv'
import connect from './utils/dbconnection'
import userRoutes from './routes/user-routes'
import orderRoutes from './routes/order-routes'
import cookies from 'cookie-parser'
import cors from 'cors'
dotenv.config()
connect() 
const app = express()
const PORT = process.env.PORT;

app.use(
  cors({
    // origin: "https://www.investorgrain.com",
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    // "https://www.investorgrain.com"
    "http://localhost:3000"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, HEAD, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

app.use(cookies())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/users', userRoutes)
app.use('/orders',orderRoutes)




app.all('**', (req:Request, res:Response)=>{
    return res.status(404).json({message: 'Not Found'})
})


app.listen(PORT, ()=> console.log('app is listening on port ' + PORT))
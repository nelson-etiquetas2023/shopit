import productRoute from './routes/product.route.js';
import authRoute from './routes/auth.route.js';
import orderRoute from './routes/order.route.js';
import express  from "express";
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: '*'}));

app.use('/api/v1', productRoute);
app.use('/api/v1', authRoute);
app.use('/api/v1', orderRoute); 

//Middleware to handle errors.
app.use(errorMiddleware);

export default app;


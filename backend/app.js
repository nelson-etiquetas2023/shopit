import productsRoute from './routes/product.route.js'
import authRoute from './routes/auth.route.js'
import express  from "express";
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.js'

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1', productsRoute);
app.use('/api/v1', authRoute);

//Middleware to handle errors.
app.use(errorMiddleware);

export default app;



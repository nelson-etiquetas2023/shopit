import  app  from './app.js'
import {connectDB} from './config/database.js';
import dotenv from "dotenv";
dotenv.config({path: '../backend/config/.env'});

//Conexion Base de Datos.
connectDB();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server starting in PORT ${process.env.PORT} in ${process.env.NODE_ENV}`);
});



// Handle unhandled Promise rejections.
process.on('unhandledRejection', (err) => {
           
   console.log(`ERROR: ${err.message}`);
   console.log('Shutting down the server due to Undandle Promise rejection');

    server.close(() => {
        process.exit(1);
    });

});

// Handle uncaughtException.
process.on('uncaughtException', (err) => {
           
    console.log(err.name, err.message);
    console.log('Uncaught Exception ocurred" Shutting Down...');

     server.close(() => {
         process.exit(1);
     });
 
 });



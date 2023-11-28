import modelProduct from './models/product.js'
import products from './config/data.js';
import dotenv from "dotenv"; 
dotenv.config({path: '../backend/config/.env'});


const LoadProducts = async () => {
    try {
        
        //await modelProduct.deleteMany();
        //console.log("products are deleted...");
        await modelProduct.insertMany(products); 
        console.log('All products are added from container products...')
        process.exit();

    } catch(error) {
        
        console.log(error.message);
        process.exit();
    
    }

}
LoadProducts();
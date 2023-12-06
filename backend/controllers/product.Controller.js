import modelProduct from '../models/product.js';
import errorHandler from '../utils/errorHandler.js';
import catchErrorAsync from '../middlewares/catchAsyncErrors.js';
import APIFeatures from '../utils/apiFeatures.js';


//Nuevo producto
export const newProduct = catchErrorAsync (async (req, res, next) => { 

    req.body.user = req.user.id;

    //crear un producto nuevo.  
    const newProduct = new modelProduct({
        nameProduct: req.body.nameProduct,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        seller: req.body.seller,
        stock: req.body.stock,
        numofReviews: req.body.numofReviews,
        reviews: req.body.reviews,
        images: req.body.images,
        user: req.body.user

    });
    //salvar el producto
    await newProduct.save();
    //devolver mensaje y un objeto json.
    console.log(newProduct);
    res.json({message: 'new product create'});
});

//obtener todos los productos en la basedatos => api/v1/products/?keyword=apple [get]
export const getProducts = catchErrorAsync (async (req, res, next) => {
    
    const resPerPage = 4;
    const productCount = await modelProduct.countDocuments();

    const apiFeatures = new APIFeatures(modelProduct.find(), req.query)
                        .search()  
                        .filter()
                        .pagination(resPerPage)                  

    const products  = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: products.length,
        productCount,
        products
    });
 

});

//obtener un producto por su id.
export const getsingleProduct = catchErrorAsync (async ( req, res, next ) => {
    
    //busca el producto por id.
    const product = await modelProduct.findById(req.params.id);

    //no existe el proucto.
    // se dispara el errorHandler.
    if(!product) {
        return next(new errorHandler('Error: producto no encontrado...', 404));
    }

    //existe el producto.
    res.status(200).json({
        success: true,
        product        
    });

});

//actualiza producto
export const updateProduct = catchErrorAsync (async (req, res) => {
   
    const {id} = req.params;

    const productUpdate = await modelProduct.findByIdAndUpdate(id, req.body, {new: true});

    if (!productUpdate) {
        return next(new errorHandler('Error: producto no encontrado...', 404));
    }

    return res.json(productUpdate);

}); 

//borra producto
export const deleteProducts = catchErrorAsync(async (req, res) => {
    
    const productDelete = await modelProduct.findByIdAndDelete(req.params.id);

    //si no esta el producto
    if(!productDelete) {
        return next(new errorHandler('Error: producto no encontrado...', 404));
    }
    
    return res.json(productDelete);
});

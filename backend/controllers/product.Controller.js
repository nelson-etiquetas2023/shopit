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
        rating: req.body.rating,
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
    
    const resPerPage = 8;
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
            resPerPage, 
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

// Create new review => /api/v1/review.
export const createProductReview = catchErrorAsync( async (req, res, next) => {

    const { rating, comment, productId} = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await modelProduct.findById(productId);
    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    );

    if(isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length; 
    }

    product.rating = product.reviews.reduce(( acc, item ) => item.rating + acc, 0) / product.reviews.length;
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    });
});

//Get Product Reviews => api/v1/reviews
export const getProductReviews = catchErrorAsync( async ( req, res, next ) =>{

    const product = await modelProduct.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

// Delete review => api/v1/review [DELETE].
export const deleteReview = catchErrorAsync( async ( req, res, next ) => {

    const product = await modelProduct.findById(req.query.productId);
    
    const reviews = product.reviews.filter(review => review._id?.toString() !== req.query.Id?.toString());
    
    const numOfReviews = reviews.length;
  
    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    
    await modelProduct.findByIdAndUpdate(req.query.productId, {
            reviews,
            ratings,
            numOfReviews
        }, {
            new: true,
            runValidators: true, 
            useFindAndModify: false
        }
    );

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });

});




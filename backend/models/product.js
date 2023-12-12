import mongoose from 'mongoose';

//model product properties.
// 1. name
// 2. price
// 3. description
// 4. ratings
// 4. images (public_id, url)
// 5. category
// 6. seller
// 7. stock
// 8. numOfReviews
// 9. reviews
// 10. createAt

const productSchema = new mongoose.Schema({
    nameProduct: {
        type: String,
        required: [true, 'debe introducir un valor para el nombre de los productos...'],
        maxLenght: [100, 'el nombre del producto no debe exceder los 100 caracteres...'],
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    price: {
        type: Number,
        required: false,
        maxLenght: [5, 'el precio no puede exceder los 5 digitos...'],
        default: 0.0
    },
    category: {
        type: String,
        enum: {
            values: ["Electronics","Hogar","Cameras","Laptop","Accesories",
                "Headphones","Food","Clothes/Shoes","Sport","Books","Beauty/Health"],
            message: "por favor introduzca correctamente la categoria del producto..."     
        },
        required:true,
    },
    seller: {
        type: String,
        trim: true,
        required: [true,"el nombre del vendedor es obligatorio..."]
    },
    stock: {
        type: Number,
        required: [true, 'error debe introducir un valor de stock en el inventario...'],
        maxLenght: [5, 'el stock tiene un alongitud maxima de 5 digitos'],
        default: 0
    },
    numofReviews: {
        type: Number,
        default: 0
    },
    reviews: [{
        name: {
            type: String,
            required: [true, 'debe introducir el nombre de la persona que hizo el review...']
        },
        rating: {
            type: Number,
            required: [true, '?? rating of the reviews...']
        },
        comment: {
            type: String,
            required: [true, '?? comment of the reviews...']
        }
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    images: [{
        public_id: {
            type: String,
            required: [true, '?? public_id odf images is required...']
        },
        url: {
            type: String,
            required: [true, '?? url of images is required...']
        }
    }], 
},{timestamps: true}); 

export default mongoose.model('Product', productSchema);
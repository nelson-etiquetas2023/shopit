import Order from '../models/order.js';
import Product from '../models/product.js';
import errorHandler from '../utils/errorHandler.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import catchErrorAsync from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../utils/errorHandler.js';

// New Order => /api/v1/order/new
export const newOrder = catchAsyncErrors( async ( req, res, next ) => {
    const { 
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paiymentInfo
     } = req.body

     const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paiymentInfo,
        paidAt: Date.now(),
        user: req.user._id
     });

     res.status(200).json({
        success: true,
        order
     });

});

// Get single Order => /api/v1/order/:id
export const getSingleOrder = catchErrorAsync( async ( req, res, next ) => {

   const order = await Order.findById(req.params.id).populate('user', 'name email');

   if (!order) {
      return next(new ErrorHandler('No Order found with this ID', 404));
   }

   res.status(200).json({
      success:true,
      order
   });

});

// Get logged in user orders => /api/v1/orders/me
export const myOrders = catchAsyncErrors( async ( req, res, next) => {

   const orders = await Order.find({ user: req.user.id });
   res.status(200).json({
      success:true,
      orders
   });
    
});

// Get all Orders => /api/v1/admin/orders
export const allOrders = catchAsyncErrors( async ( req, res, next ) => {

   const orders = await Order.find();
   
   let totalAmount = 0;

   orders.forEach(order => {
      totalAmount += order.totalPrice;
   });   

   res.status(200).json({
      success: true,
      orders,
      totalAmount
   });
   
});



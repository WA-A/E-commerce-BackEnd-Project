import connectDB from '../DB/ConnectDB.js';
import CategoriesRouter from './modules/Category/Category.router.js';
import SubCategoriesRouter from './modules/SubCategory/SubCategory.router.js';
import ProductRouter from './modules/Product/Product.router.js';
import OrderRouter from './modules/Order/Order.router.js'
import CouponRouter from './modules/Coupon/Coupon.router.js';
import AuthRouter from './modules/auth/auth.router.js';
import CartRouter from './modules/Cart/Cart.router.js';
import UserRouter from './modules/User/User.router.js';
import ReviewRouter from './modules/Review/Review.router.js';

import cors from 'cors';


const Appinit = (app,express)=>{
    app.use(express.json());
    app.use(cors())
    connectDB();
    app.use('/categories',CategoriesRouter);
    app.use('/subcategories',SubCategoriesRouter);
    app.use('/product',ProductRouter);
    app.use('/cart',CartRouter);
    app.use('/order',OrderRouter);
    app.use('/coupon',CouponRouter);
    app.use('/user',UserRouter);
    app.use('/review',ReviewRouter);
    app.use('/auth',AuthRouter);
    
    app.use('*',(req,res)=>{
        return res.status(404).json({message:"Page not Found"});
    });

    app.use( (err,req,res,next)=>{ // global error is 4 parameter than middelware is 3 parameter
     res.json({message:err.message});
    });
 
}
export default Appinit ;
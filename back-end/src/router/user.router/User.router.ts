import { Router } from 'express';
import user from '../../controller/User.controller';
import { authenticateToken, isAdmin } from '../../middlerware/authentication';

const userRouter = Router();

userRouter.post('/sign-up', user.sign_up);
userRouter.get('/getUser', authenticateToken, user.GetUserById);
userRouter.post('/staff-registration', authenticateToken, user.RegisterStaff);
userRouter.post('/deliver-registration', authenticateToken, user.RegisterDeliver);
userRouter.post('/take-order', authenticateToken, user.TakeOrder);
userRouter.put('/update-infomation', authenticateToken, user.UpdateUser);
userRouter.post('/agreeRegis', authenticateToken, isAdmin, user.AgreeRegister);
userRouter.post('/deleteRegis', authenticateToken, isAdmin, user.DeleteRegister);
userRouter.post('/list-register', authenticateToken, user.ListRegister);
userRouter.get('/view-cart', authenticateToken, user.ViewCart);
userRouter.get('/view-cart-of-user', authenticateToken, user.ViewCartOfUser);
userRouter.put('/update-quantity',authenticateToken, user.UpdateQuantity);
userRouter.delete('/remove-product',authenticateToken, user.RemoveProduct);
userRouter.get('/checkout', authenticateToken, user.CheckOut);
userRouter.post('/purchers-products', authenticateToken, user.PurchersProduct);
export default userRouter;

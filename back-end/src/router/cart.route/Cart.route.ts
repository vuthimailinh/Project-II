import { Router } from 'express';
import { authenticateToken } from '../../middlerware/authentication';
import cartController from '../../controller/cart.controller';

const cartRoute = Router();

cartRoute.post('/add-to-cart', cartController.addToCart);
cartRoute.get('/view-cart', cartController.viewCart);
cartRoute.delete('/remove-cart', cartController.removeCart);
cartRoute.put('/update-cart', cartController.updateCart);

cartRoute.put('/checkout', cartController.checkout);
cartRoute.get('/view-order', cartController.viewOrder);

export default cartRoute;

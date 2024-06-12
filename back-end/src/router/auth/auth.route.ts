import { Router } from 'express';
import user from '../../controller/User.controller';
import GoogleAuth from './auth.google';
import { authenticateTempToken, authenticateToken } from '../../middlerware/authentication';
// import GoogleAuth from "./auth.google";
const authRouter = Router();

authRouter.post('/sign-up', user.sign_up);
authRouter.post('/sign-in', user.sign_in);
authRouter.post('/forgot-password/getCode', user.password_getcode);
authRouter.post('/verifyResetCode', user.verifyResetCode);
authRouter.post('/forgot-password/reset-password', authenticateTempToken, user.reset_pass);
authRouter.post('/get-access-token', user.get_access_token);
authRouter.post('/sendCode', user.sendCode);
authRouter.post('/verifyUser', user.verifyUser);
authRouter.use('/google-auth', GoogleAuth);

// authRouter.use("/google-auth", GoogleAuth);

export default authRouter;


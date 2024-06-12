import userServices from '../services/User.services';
import jwt from 'jsonwebtoken';

import auhtService from '../services/auth.service';
import { Irestaff, IreDeliver, IupDateUser, ItakeOrder } from '../utils/user.interface';
import { Response, Request } from 'express';
import {
    ErrorFromServer,
    ErrorResponse,
    ErrorResponseType,
    InvalidInput,
    MissingParameter,
} from '../utils/errorResponse';
import authService from '../services/auth.service';
import Logger from '../lib/logger';
import {
    ICheckResetPass,
    IFailRes,
    IForgotPassEmail,
    IResetPass,
    ISignIn,
    ISignUp,
    ISuccessRes,
    IToken,
    IVertifyUser,
    JwtPayLoad,
} from '../utils/auth.interface';
import { genSaltSync, hash, hashSync } from 'bcrypt';
import { config } from 'dotenv';
import authRouter from '../router/auth/auth.route';
import UserModel from '../models/User.model';
import RefreshTokenModel, { IRefreshToken } from '../models/Token.model';
import { ObjectId } from 'mongodb';
import { log } from 'console';
import OrderModel from '../models/Order.model';
config();

class User {
    async sign_up(req: Request<any, any, ISignUp>, res: Response<ISuccessRes | IFailRes>) {
        try {
            const { email, password, username, role, phoneNumber } = req.body;

            if (!email || !password || !username) {
                throw new MissingParameter();
            }
            if (!authService.validate('email', email) || !authService.validate('password', password)) {
                throw new InvalidInput();
            }
            const user = await authService.signUp(email, password, username, role, phoneNumber);

            const payload = {
                _id: user._id,
                email: user.email,
            };

            // * accesstoken la dang ma hoa cua { id, email } can co khoa

            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || 'ACCESS_TOKEN_SECRET', {
                expiresIn: process.env.EXPIRES_TOKEN_TIME || '1h',
            });

            const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || 'REFRESH_TOKEN_SECRET');

            await authService.addTokens(refreshToken, user._id);

            return res.status(200).json({
                message: 'successful',
                data: {
                    accessToken,
                    refreshToken,
                },
            });
        } catch (error: any) {
            // Logger.error(error);
            console.log(error);

            const Err = new ErrorResponse(error.message as string, error.statusCode as number);

            return res.status(Err.statusCode).json({ message: Err.message });
        }
    }

    async sign_in(req: Request<any, any, ISignIn>, res: Response<ISuccessRes | IFailRes>) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw new MissingParameter();
            }
            if (!authService.validate('email', email) || !authService.validate('password', password)) {
                throw new InvalidInput();
            }

            const user = await authService.signIn(email, password);

            const payload = {
                _id: user._id,
                email: user.email,
            };
            console.log(process.env.EXPIRES_TOKEN_TIME);
            // phien ban ma hoa
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || 'ACCESS_TOKEN_SECRET', {
                expiresIn: '1h',
            });
            // ma hoa + key -> phien ban chua decode

            // * save refresh Token vao database => lay lai access Token
            // * luu 1 chuoi cac access token => nhieu ng dung cung dang nhap cung mot luc
            // * xoa refreshToken tren dien thoai
            // * xoa luon []

            const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || '');

            await authService.addTokens(refreshToken, user._id);

            return res.status(200).json({
                message: 'successful',
                data: {
                    accessToken,
                    refreshToken,
                },
            });
        } catch (error: any) {
            // Logger.error(error);
            console.log(error);

            const Err = new ErrorResponse(error.message as string, error.statusCode as number);

            return res.status(Err.statusCode).json({ message: Err.message });
        }
    }

    async logout(req: Request<any, any, IToken>, res: Response<ISuccessRes | IFailRes>) {
        try {
            const { userId, refreshToken } = req.body;

            const Token_id = await authService.removeToken(userId, refreshToken);

            return res.status(204).json({ message: 'logged out!' });
        } catch (error: any) {
            console.log(error);

            const Err = new ErrorResponse(error.message as string, error.statusCode as number);

            return res.status(Err.statusCode).json({ message: Err.message });
        }
    }
    async googleAuth() { }

    async password_getcode(req: Request<any, any, IForgotPassEmail>, res: Response<ISuccessRes | IFailRes>) {
        const { email } = req.body;
        try {
            const { email } = req.body;

            if (!email) {
                throw new MissingParameter();
            }

            if (!authService.validate('email', email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }
            if (!(await authService.isExistEmail(email))) {
                throw new InvalidInput('Email is not exist');
            }

            const sendCode = await authService.sendCodePassword(email);

            return res.status(200).json({
                message: 'Verify your email',
            });
        } catch (error: any) {
            console.log(error);

            const Err = new ErrorResponse(error.message as string, error.statusCode as number);

            return res.status(Err.statusCode).json({ message: Err.message });
        }
    }

    async verifyResetCode(req: Request<any, any, ICheckResetPass>, res: Response<ISuccessRes | IFailRes>) {
        try {
            const { email, resetCode } = req.body;
            if (!email || !resetCode) {
                throw new MissingParameter();
            }
            if (!authService.validate('email', email)) {
                throw new ErrorResponse('Invalid email format', 400);
            }
            var result = await authService.checkResetPassCode(email, resetCode);
            if (result === 200) {
                const user = await UserModel.findOne({ email: email });
                if (user) {
                    const tempToken = jwt.sign({ email }, process.env.TEMP_TOKEN_SECRET || '', { expiresIn: '15m' });
                    await authService.addTempTokens(tempToken, user._id);
                    return res.status(200).json({
                        message: 'successful',
                        data: {
                            tempToken,
                        },
                    });
                }
            }

            if (result === 400) {
                throw new ErrorResponse('Invalid verification passcode', 400);
            }

            if (result === 404) {
                throw new ErrorResponse('User not found', 404);
            }

            if (result === 408) {
                throw new ErrorResponse('Ma het hieu luc', 408);
            }
        } catch (error: any) {
            const Err = new ErrorResponse(error.message as string, error.statusCode as number);

            return res.status(Err.statusCode).json({ message: Err.message });
        }
    }

    async reset_pass(req: Request<any, any, IResetPass>, res: Response<ISuccessRes | IFailRes>) {
        try {
            const { password } = req.body;

            if (!password) {
                throw new MissingParameter();
            }
            if (!authService.validate('password', password)) {
                throw new ErrorResponse('Invalid password format', 400);
            }
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (token == null)
                return res.status(401).json({
                    message: 'Un-verified',
                });

            let payload = jwt.verify(token, process.env.TEMP_TOKEN_SECRET || '');
            let email;
            email = (payload as any).email;
            if (email) {
                const user = await UserModel.findOne({ email: email });
                if (user) {
                    const salt = genSaltSync(10);
                    const hash = hashSync(password, salt);
                    user.password = hash;
                    await user.save();
                    //console.log(hash);

                    const payload = {
                        _id: user._id,
                        email: user.email,
                    };

                    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || '', {
                        expiresIn: process.env.EXPIRES_TOKEN_TIME,
                    });

                    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || '');

                    await authService.addTokens(refreshToken, user._id);
                    return res.status(200).json({
                        message: 'successful',
                        data: {
                            accessToken,
                            refreshToken,
                        },
                    });
                }
            }
        } catch (error: any) {
            console.log(error);
            const Err = new ErrorResponse(error.message as string, error.statusCode as number);

            return res.status(Err.statusCode).json({ message: Err.message });
        }
    }

    async get_access_token(req: Request<any, any, { refreshToken: string }>, res: Response<ISuccessRes | IFailRes>) {
        try {
            const { refreshToken } = req.body;
            console.log(refreshToken);

            if (!refreshToken) {
                throw new MissingParameter('Missing refresh tokens');
            }
            const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || '');
            const email = (payload as any).email;
            const user = await UserModel.findOne({ email: email });
            if (!user) {
                throw new InvalidInput('Email is not exist');
            }
            const token = await RefreshTokenModel.findOne({
                userId: user._id,
            });

            if (!token) {
                throw new InvalidInput();
            }

            for (let index = 0; index < token.refreshTokens.length; index++) {
                if (refreshToken == token.refreshTokens[index]) {
                    const payload = {
                        _id: user._id,
                        email: user.email,
                    };
                    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || '', {
                        expiresIn: process.env.EXPIRES_TOKEN_TIME,
                    });
                    return res.status(200).json({
                        message: 'successful',
                        data: {
                            accessToken,
                            refreshToken,
                        },
                    });
                }
            }
        } catch (error: any) {
            console.log(error);

            const Err = new ErrorResponse(error.message as string, error.statusCode as number);

            return res.status(Err.statusCode).json({ message: Err.message });
        }
    }
    async sendCode(req: Request<any, any, IForgotPassEmail>, res: Response<ISuccessRes | IFailRes>) {
        try {
            const { email } = req.body;

            if (!email) {
                throw new MissingParameter();
            }
            if (!authService.validate('email', email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }

            const sendCode = await authService.sendCode(email);

            return res.status(200).json({
                message: 'Verification code sent successfully',
            });
        } catch (error: any) {
            console.log(error);

            const Err = new ErrorResponse(error.message as string, error.statusCode as number);

            return res.status(Err.statusCode).json({ message: Err.message });
        }
    }

    async verifyUser(req: Request<any, any, IVertifyUser>, res: Response<ISuccessRes | IFailRes>) {
        try {
            const { email, code } = req.body;

            if (!email || !code) {
                throw new MissingParameter();
            }
            if (!authService.validate('email', email)) {
                throw new ErrorResponse('Invalid email format', 400);
            }

            var result = await authService.vertifyUser(email, code);
            if (result === 200) {
                return res.status(200).json({
                    message: 'User verified successfully',
                });
            }
            if (result === 400) {
                throw new ErrorResponse('Invalid vertification', 400);
            }

            if (result === 404) {
                throw new ErrorResponse('User not found', 404);
            }

            if (result === 408) {
                throw new ErrorResponse('Ma het hieu luc', 400);
            }
        } catch (error: any) {
            console.log(error);
            const Err = new ErrorResponse(error.message as string, error.statusCode as number);

            return res.status(Err.statusCode).json({ message: Err.message });
        }
    }

    async GetUserById(req: any, res: any) {
        try {
            const { userId } = req.body;
            // const userId = req.user._id;
            console.log(userId);
            console.log('Received data:', userId);
            const result = await userServices.getUserById(userId);

            if (result) {
                return res.status(200).json({ message: 'successful', data: result });
            } else throw new ErrorFromServer();
        } catch (error) {
            return res.status(400).json({ message: 'Invalid username supplied' });
        }
    }

    async RegisterStaff(req: any, res: Response<ISuccessRes | IFailRes>) {
        try {
            const { userId } = req.body;
            const { email } = req.body;
            console.log('Received data:', userId, email);
            const result = await userServices.saveRegister(userId, email, 'staff');
            if (result.success) {
                return res.status(200).json({ message: 'successful operation' });
            } else {
                return res.status(400).json({ message: 'failed xx' });
            }
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'failed xx' });
        }
    }

    async RegisterDeliver(req: any, res: Response<ISuccessRes | IFailRes>) {
        try {
            const { userId } = req.body;
            const { email } = req.body;
            console.log('Received data:', req.body);
            const result = await userServices.saveRegister(userId, email, 'deliver');
            if (result.success) {
                return res.status(200).json({ message: 'successful operation' });
            } else {
                return res.status(400).json({ message: 'failed' });
            }
        } catch (error) {
            return res.status(400).json({ message: 'failed' });
        }
    }
    async UpdateUser(req: any, res: Response<ISuccessRes | IFailRes>) {
        try {
            const { userId } = req.body;
            console.log(userId);
            const { name, username, password, email, phone } = req.body;
            const result = await userServices.updateUser(userId, name, username, password, email, phone);
            if (result.success) {
                return res.status(200).json({ message: 'successful operation' });
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            return res.status(400).json({ message: 'fail operation' });
        }
    }
    async TakeOrder(req: any, res: Response<ISuccessRes | IFailRes>) {
        try {
            const { userId } = req.body;
            console.log(userId);
            const { product_id } = req.body;
            console.log(product_id);
            const result = await userServices.takeOrder(product_id, userId);
            if (result.success) {
                return res.status(200).json({ message: 'successful operation' });
            }
        } catch (error) {
            return res.status(400).json({ message: 'fail operation' });
        }
    }

    // đồng ý đăng kí của user
    async AgreeRegister(req: any, res: Response<ISuccessRes | IFailRes>) {
        try {
            const { email, role } = req.body;
            const result = await userServices.agreeRegister(email, role);
            if (result.success) {
                return res.status(200).json({ message: 'successful operation' });
            } else {
                return res.status(404).json({ message: ' ko dong y thanh cong' });
            }
        } catch (error) {
            return res.status(400).json({ message: 'fail operation' });
        }
    }
    // không đồng ý các đăng kí của user
    async DeleteRegister(req: any, res: Response<ISuccessRes | IFailRes>) {
        try {
            const { _id } = req.body;
            console.log(_id);
            const result = await userServices.deleteRegister(_id);
            if (result.success) {
                return res.status(200).json({ message: 'successful operation' });
            } else {
                return res.status(404).json({ message: ' ko thanh cong' });
            }
        } catch (error) {
            return res.status(400).json({ message: 'fail operation' });
        }
    }

    async ListRegister(req: Request<any, any, any>, res: Response<ISuccessRes | IFailRes>) {
        try {
            // Sử dụng service để lấy danh sách đăng kí từ cơ sở dữ liệu
            const listRegister = await userServices.getAllRegister();
            if (!listRegister) {
                return res.status(404).json({ message: 'List register not found' });
            }
            return res.status(200).json({ message: 'Successful operation' });
        } catch (error: any) {
            console.log(error);
            const Err = new ErrorResponse(error.message as string, error.statusCode as number);
            return res.status(Err.statusCode).json({ message: Err.message });
        }
    }

    async ViewApply(req: Request<any, any, any>, res: Response<ISuccessRes | IFailRes>) {
        try {
            const { type } = req.params;
            const allowedTypes = ['all', 'deliver', 'staff'];
            if (!allowedTypes.includes(type)) {
                throw new InvalidInput();
            }
            const listApply = await userServices.getAllApply(type);
            if (listApply === 500) {
                throw new ErrorResponse('Internal server error', 500);
            }
            return res.status(200).json({
                message: 'successful',
                data: {
                    listApply,
                },
            });
        } catch (error: any) {
            const Err = new ErrorResponse(error.message as string, error.statusCode as number);
            return res.status(Err.statusCode).json({ message: Err.message });
        }
    }

    async ViewList(req: Request<any, any, any>, res: Response<ISuccessRes | IFailRes>) {
        try {
            const { type } = req.params;
            const allowedTypes = ['all', 'deliver', 'staff'];
            if (!allowedTypes.includes(type)) {
                throw new InvalidInput();
            }
            const list = await userServices.getAllList(type);
            if (list === 500) {
                throw new ErrorResponse('Internal server error', 500);
            }
            return res.status(200).json({
                message: 'successful',
                data: {
                    list,
                },
            });
        } catch (error: any) {
            const Err = new ErrorResponse(error.message as string, error.statusCode as number);
            return res.status(Err.statusCode).json({ message: Err.message });
        }
    }

    async ViewOrder(req: Request<any, any, any>, res: Response<ISuccessRes | IFailRes>) {
        try {
            const { status } = req.params;
            const allowedTypes = [
                'allData',
                'notExaminedData',
                'package',
                'deliveringData',
                'completedData',
                'deleteData',
                'returnData',
                'pending',
            ];
            if (!allowedTypes.includes(status)) {
                throw new InvalidInput();
            }

            const list = await userServices.getAllOrder(status);
            console.log(list);
            if (list === 500) {
                throw new ErrorResponse('Internal server error', 500);
            }
            return res.status(200).json({
                message: 'successful',
                data: {
                    list,
                },
            });
        } catch (error: any) {
            const Err = new ErrorResponse(error.message as string, error.statusCode as number);
            return res.status(Err.statusCode).json({ message: Err.message });
        }
    }

    async Accept(req: Request<any, any, any>, res: Response<ISuccessRes | IFailRes>) {
        try {
            const { id, type } = req.body;
            const status = await userServices.acceptUser(id, type);
            if (status === 200) {
                return res.status(200).json({
                    message: 'successful',
                });
            }
            if (status === 400) {
                throw new ErrorResponse('Bad request. Invalid id parameter', 200);
            }
            if (status === 404) {
                throw new ErrorResponse('User not found', 404);
            }
            if (status === 500) {
                throw new ErrorResponse('Internal server error', 500);
            }
        } catch (error: any) {
            const Err = new ErrorResponse(error.message as string, error.statusCode as number);
            return res.status(Err.statusCode).json({ message: Err.message });
        }
    }

    async notAccept(req: Request<any, any, any>, res: Response<ISuccessRes | IFailRes>) {
        try {
            const { id, type } = req.body;
            const status = await userServices.notAcceptUser(id, type);
            if (status === 200) {
                return res.status(200).json({
                    message: 'successful',
                });
            }
            if (status === 400) {
                throw new ErrorResponse('Bad request. Invalid id parameter', 200);
            }
            if (status === 500) {
                throw new ErrorResponse('Internal server error', 500);
            }
        } catch (error: any) {
            const Err = new ErrorResponse(error.message as string, error.statusCode as number);
            return res.status(Err.statusCode).json({ message: Err.message });
        }
    }


    async CheckOut(req: Request<any, any, any>, res: Response<ISuccessRes | IFailRes>) {
            try {
                // Sử dụng service để lấy danh sách đăng kí từ cơ sở dữ liệu
                const { userId } = req.body;
                const { productId } = req.body;
                const check_Out = await userServices.checkOut(userId, productId);
                if (check_Out) {
                    console.log(check_Out.message);
                    return res.status(200).json({ message: 'Order placed successfully' });
                } else {
                    return res.status(404).json({ message: 'xxxxxx' });
                }
            } catch (error: any) {
                console.log(error);
                const Err = new ErrorResponse(error.message as string, error.statusCode as number);
                return res.status(Err.statusCode).json({ message: Err.message });
            }
        }
    async ViewCart(req: Request, res: Response) {
            try {
                const { userId } = req.body;
                console.log(userId);
                const cartItems = await userServices.viewCart(userId);

                if (cartItems.success) {
                    return res.status(200).json({
                        success: true,
                        data: cartItems.data,
                    });
                } else {
                    return res.status(400).json({
                        success: false,
                        message: cartItems.message,
                    });
                }
            } catch (error) {
                console.error('Error retrieving cart items:', error);
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        }

    async ViewCartOfUser(req: Request, res: Response) {
            try {
                const { userId } = req.body;
                console.log(userId);
                const cartItems = await userServices.viewCartOfUser(userId);
                return res.status(200).json({
                    success: true,
                    data: cartItems,
                });

            } catch (error) {
                console.error('Error retrieving cart items:', error);
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        }

    async UpdateQuantity(req: Request, res: Response) {
            try {
                const { userId, productId, quantity } = req.body;
                const cartItems = await userServices.updateQuantity(userId, productId, quantity);
                return res.status(200).json({
                    success: true,
                    data: cartItems,
                });
            } catch (error) {
                console.error('Error retrieving cart items:', error);
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        }
    
    async RemoveProduct(req: Request, res: Response) {
            try {
                const { userId, productId } = req.body;
                const cartItems = await userServices.removeProduct(userId, productId);
                return res.status(200).json({
                    success: true,
                    data: cartItems,
                });
            } catch (error) {
                console.error('Error retrieving cart items:', error);
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            }
        }

    async PurchersProduct(req: Request, res: Response) {
            try {
                const { userId } = req.body;
                const { productId } = req.body;
                console.log(userId);
                const product_purchers = await userServices.purchersProduct(userId, productId);

            if (product_purchers?.success) {
                return res.status(200).json({
                    message: product_purchers.message,
                });
            } else {
                return res.status(400).json({
                    message: 'no okxx',
                });
            }
        } catch (error) {
            console.error('Error retrieving cart items:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    async updateStatus(req: Request<any, any, any>, res: Response<ISuccessRes | IFailRes>) {
        try {
            const { order_Id, status } = req.body;
            const order = await userServices.updateStatusOrder(order_Id, status);
            return res.status(200).json({
                message: 'successful',
                data: {
                    order,
                },
            });
        } catch (error: any) {
            const Err = new ErrorResponse(error.message as string, error.statusCode as number);
            return res.status(Err.statusCode).json({ message: Err.message });
        }
    }
}
const user = new User();
export default user;

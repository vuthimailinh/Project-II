import { compare, compareSync, genSaltSync, hash, hashSync } from 'bcrypt';
import UserModel, { IUser } from '../models/User.model';
import { ErrorResponse, InvalidInput } from '../utils/errorResponse';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import TokenModel from '../models/Token.model';
import RefreshTokenModel from '../models/Token.model';
import { log } from 'console';
import { IResultResetPass } from '../utils/auth.interface';
import mongoose from 'mongoose';

config();

class AuthService {
    async signUp(email: string, password: string, username: string, role?: string, phoneNumber?: string) {
        if (await this.isExistEmail(email)) {
            throw new InvalidInput('Email already exists');
        }

        if (await this.isExistUsername(username)) {
            throw new InvalidInput('Username already exists');
        }
        const salt = genSaltSync(10);
        const hash = hashSync(password, salt);

        const newUser = await UserModel.create({
            email: email,
            password: hash,
            username: username,
            role: role,
            phoneNumber: phoneNumber,
        });

        return newUser;
    }

    // async authGoogle(email: string, username: string, image: string) {
    //     const user = await UserModel.findOne({ email: email });

    //     if (user) {
    //         return user;
    //     }
    //     const password: string = this.generateRandomString(10);
    //     const salt = genSaltSync(10);
    //     const hash = hashSync(password, salt);
    //     const newUser = await UserModel.create({
    //         email,
    //         username,
    //         image,
    //         password: hash,
    //     });

    //     return newUser;
    // }
    async signIn(email: string, password: string) {
        const user = await UserModel.findOne({ email: email });

        if (!user) {
            throw new InvalidInput('Email not found');
        }
        let isMatch = compareSync(password, user.password);

        if (!isMatch) {
            throw new InvalidInput('Password not match');
        }

        return user;
    }

    validate(type: 'email' | 'password', value: string) {
        if (type === 'email') {
            const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            console.log(type);
            console.log(emailRegex.test(value));
            return emailRegex.test(value);
        }
        if (type === 'password') {
            const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
            console.log(type);
            console.log(passwordRegex.test(value));
            return passwordRegex.test(value);
        }
        return false;
    }

    randomPass() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&.';
        let password = '';
        for (let i = 0; i < 16; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }
        return password;
    }

    checkrandomPass() {
        let password = this.randomPass();
        while (!this.validate('password', password)) {
            password = this.randomPass();
        }
        return password;
    }

    async isExistEmail(email: string) {
        const user = await UserModel.findOne({ email }).lean().exec();

        if (user) {
            return true;
        }
        return false;
    }
    async isExistUsername(username: string) {
        const user = await UserModel.findOne({ username }).lean().exec();
        if (user) {
            return true;
        }
        return false;
    }

    async addTokens(token: string, userId: string) {
        const refreshToken = await RefreshTokenModel.findOne({ userId });

        if (!refreshToken) {
            await RefreshTokenModel.create({ userId, refreshTokens: [token] });

            return;
        }
        refreshToken.refreshTokens.push(token);
        await refreshToken.save();
        return;
    }
    async addTempTokens(token: string, userId: string) {
        const tempToken = await RefreshTokenModel.findOne({ userId });

        if (!tempToken) {
            await RefreshTokenModel.create({ userId, tempTokens: [token] });

            return;
        }
        tempToken.tempTokens.push(token);
        await tempToken.save();
        return;
    }

    async removeToken(userId: string, refreshToken: string) {
        const Token = await RefreshTokenModel.findOne({ userId });

        console.log('da vao duoc log out');

        if (!Token) {
            throw new ErrorResponse('User had logged out!', 400);
        }
        let refreshTokens = Token.refreshTokens.filter((token) => token !== refreshToken);

        Token.refreshTokens = refreshTokens;
        await Token.save();

        return Token._id;
    }

    generateRandomString(length: number): string {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomString = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            randomString += charset[randomIndex];
        }
        return randomString;
    }
    generateRandomDigits(length: number = 6): string {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10); // Generates random digits from 0 to 9
        }
        return result;
    }

    async sendCodePassword(email: string): Promise<string | false> {
        const code = this.generateRandomDigits();
        console.log(code);
        try {
            var nodemailer = require('nodemailer');
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: 'mailinhv534@gmail.com',
                    pass: 'nrydytummnqecfpn',
                },
            });

            var mailOptions = {
                from: 'mailinhv534@gmail.com',
                to: email,
                subject: 'Sending Email to code to reset password',
                text: code,
            };

            await transporter.sendMail(mailOptions);
            const expiresAt = Date.now() + 5 * 60 * 1000;

            const user = await UserModel.findOne({ email });
            if (user) {
                user.reset_password = { code: code, expiresAt: expiresAt };
                await user.save();
            }
            return code;
        } catch (error: any) {
            console.error(error);
            return false;
        }
    }

    async checkResetPassCode(email: string, resetCode: string) {
        try {
            // Tìm mã code trong mảng của email
            const user = await UserModel.findOne({ email });

            if (!user) {
                return 404;
            }
            const passcode = user?.reset_password;
            if (!passcode || passcode.code !== resetCode) {
                return 400;
            }
            if (passcode.expiresAt < Date.now()) {
                return 408;
            }
            return 200;
        } catch (error: any) {
            console.log(error);
        }
    }

    async sendCode(email: string): Promise<string | false> {
        const code = String(Math.floor(100000 + Math.random() * 900000));
        try {
            var nodemailer = require('nodemailer');
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: 'mailinhv534@gmail.com',
                    pass: 'nrydytummnqecfpn',
                },
            });

            var mailOptions = {
                from: 'mailinhv534@gmail.com',
                to: email,
                subject: 'Sending Email to sendCode',
                text: code,
            };

            await transporter.sendMail(mailOptions);
            console.log(code);
            const expiresAt = Date.now() + 3 * 60 * 1000;

            const user = await UserModel.findOne({ email });
            if (user) {
                user.vetify_user = { code: code, expiresAt: expiresAt };
                await user.save();
            }
            return code;
        } catch (error: any) {
            console.error(error);
            return false;
        }
    }

    async vertifyUser(email: string, code: string) {
        try {
            // Tìm mã code trong mảng của email
            const user = await UserModel.findOne({ email });

            if (!user) {
                return 404;
            }
            const passcode = user.vetify_user;
            if (!passcode || passcode.code !== code) {
                return 400;
            }
            if (passcode.expiresAt < Date.now()) {
                return 408;
            }

            return 200;
        } catch (error: any) {
            console.log(error);
        }
    }
    
}

const authService = new AuthService();

export default authService;


import passport, { Profile } from "passport";
import jwt from "jsonwebtoken";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import authService from "../services/auth.service";
import UserModel from "../models/User.model";
import mongoose from "mongoose";
import { genSaltSync, hashSync } from "bcrypt";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID as string,
            clientSecret: process.env.CLIENT_SECRET as string,
            callbackURL: process.env.URL_CALLBACK,
        },
        async (
            accessToken: any,
            refreshToken: any,
            profile: Profile,
            done: any
        ) => {
            const email = profile.emails?.shift()?.value;
            const name = profile.name?.givenName;
            const image = profile.photos?.shift()?.value;
            const googleId = profile.id;
            try {
                console.log(process.env.URL_CALLBACK);
                
                if (email && name && image) {
                    let user = await UserModel.findOne({ googleId: googleId });
                    //console.log(user);

                    if (!user) {
                        const salt = genSaltSync(10);
                        const hash = hashSync(email, salt);
                        user = new UserModel({
                            _id: new mongoose.Types.ObjectId().toString(),
                            password: hash, // Google users don't have local passwords
                            email: email,
                            name: name,
                            username: name, // Hoặc bạn có thể lấy một username từ email hoặc tên
                            status: 'active',
                            role: 'user',
                            vetify_user: { code: '', expiresAt: 0 },
                            reset_password: { code: '', expiresAt: 0 },
                            phoneNumber: null,
                            store_id: null,
                            image: image,
                            googleId: googleId,
                            authProvider: 'google',
                        });
                        await user.save();
                    }

                    const payload = {
                        _id: user._id,
                        email: user.email,
                    };
                    //console.log("payload:", payload);


                    // * accesstoken la dang ma hoa cua { id, email } can co khoa

                    const accessToken = jwt.sign(
                        payload,
                        process.env.ACCESS_TOKEN_SECRET || "",
                        { expiresIn: process.env.EXPIRES_TOKEN_TIME }
                    );

                    const refreshToken = jwt.sign(
                        payload,
                        process.env.REFRESH_TOKEN_SECRET || ""
                    );

                    await authService.addTokens(refreshToken, user._id);
                    //console.log(accessToken, "mailinh       ",refreshToken);
                    done(null,
                        {
                            accessToken,
                            refreshToken
                        }
                    )

                }
            } catch (error) {
                console.log(error);
                done(null, profile);
            }
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});


export default passport;


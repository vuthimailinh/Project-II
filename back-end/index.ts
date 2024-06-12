import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import morganMiddleware from './src/configs/morganMiddleware';
import helmet from 'helmet';
import passport from '../back-end/src/lib/passport'
import compression from 'compression';
import { json } from 'body-parser';
// * innitialization
import appRouter from './src/router/index.router';
import { connectDB } from './src/database/mongodb/connect.mongo';
import cors from 'cors';
const cookieSession = require('cookie-session');

import authRouter from './src/router/auth/auth.route';

import session from 'express-session';

dotenv.config();
const passportSetup = require('./src/lib/passport');
// * innitialization

const app: Application = express();
const PORT = process.env.PORT || 5000;
const api_version = process.env.API_VERSION || '/api/v1';
// * middleware
app.use(morganMiddleware);
app.use(helmet());
app.use(compression());
app.use(json());
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());

// * api version
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.use(
    cookieSession({
        name: 'session',
        keys: ['openreplay'],
        maxAge: 24 * 60 * 60 * 100,
    }),
);

app.use(passport.initialize());
app.use(passport.session());

// * connect to db
connectDB().then((res) => console.log(res));

// * router

// app.use('/auth', authRouter);
app.use(api_version, appRouter);

// * handle Error
// testConnection();
// * server running
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (error, promise) => {
    console.log(`Logged Error: ${error}`);
    server.close(() => process.exit(1));
});

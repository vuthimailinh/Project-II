import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// bat dong bo
export const connectDB = async () => {
    try {
        if (MONGODB_URI) {
            await mongoose.connect(MONGODB_URI);
            console.log('MongoDB connected successfully');
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

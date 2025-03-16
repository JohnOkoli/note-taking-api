import express from 'express';
import mongoose from 'mongoose';
import noteRoutes from './routes/noteRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { loggingMiddleware } from './middlewares/loggingMiddleware';

const app = express();
app.use(express.json());
app.use(loggingMiddleware);
app.use(noteRoutes);
app.use(errorHandler);

const startServer = async () => {
    try {
        // Remove deprecated options
        await mongoose.connect('mongodb://localhost:27017/note-taking-api');
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

// Only start the server if this file is run directly
if (require.main === module) {
    startServer();
}

export default app;

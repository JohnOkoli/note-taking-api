import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../types/customErrors';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    
    res.status(500).json({ message: 'Internal Server Error' });
};

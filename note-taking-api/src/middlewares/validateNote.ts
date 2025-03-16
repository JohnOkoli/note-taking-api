import { Request, Response, NextFunction } from 'express';
import { Note } from '../types/note';

export const validateNote = (req: Request, res: Response, next: NextFunction) => {
    const { title, content, categoryId } = req.body;
    if (!title || !content || !categoryId) {
        return res.status(400).json({ message: 'Title, content, and categoryId are required' });
    }
    next();
};
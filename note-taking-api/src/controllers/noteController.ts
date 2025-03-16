import { Request, Response, NextFunction } from 'express';
import NoteModel from '../models/noteModel';
import CategoryModel from '../models/categoryModel';
import { CustomError } from '../types/customErrors';

// Get all notes
export const getAllNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notes = await NoteModel.find();
        res.json(notes);
    } catch (error) {
        next(new CustomError('Failed to fetch notes', 500));
    }
};

// Get a specific note
export const getNoteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const note = await NoteModel.findById(req.params.id);
        if (!note) throw new CustomError('Note not found', 404);
        res.json(note);
    } catch (error) {
        if (error instanceof CustomError) {
            next(error);
        } else {
            next(new CustomError('Failed to fetch note', 500));
        }
    }
};

// Create a new note
export const createNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check if category exists
        const categoryExists = await CategoryModel.exists({ _id: req.body.categoryId });
        if (!categoryExists) throw new CustomError('Category not found', 404);
        
        const note = new NoteModel(req.body);
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        if (error instanceof CustomError) {
            next(error);
        } else {
            next(new CustomError('Failed to create note', 500));
        }
    }
};

// Delete a note
export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const note = await NoteModel.findByIdAndDelete(req.params.id);
        if (!note) throw new CustomError('Note not found', 404);
        res.status(204).send();
    } catch (error) {
        if (error instanceof CustomError) {
            next(error);
        } else {
            next(new CustomError('Failed to delete note', 500));
        }
    }
};

// Update a note
export const updateNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check if category exists if categoryId is being updated
        if (req.body.categoryId) {
            const categoryExists = await CategoryModel.exists({ _id: req.body.categoryId });
            if (!categoryExists) throw new CustomError('Category not found', 404);
        }
        
        const note = await NoteModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!note) throw new CustomError('Note not found', 404);
        res.json(note);
    } catch (error) {
        if (error instanceof CustomError) {
            next(error);
        } else {
            next(new CustomError('Failed to update note', 500));
        }
    }
};

// Get notes by category
export const getNotesByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check if category exists
        const categoryExists = await CategoryModel.exists({ _id: req.params.categoryId });
        if (!categoryExists) throw new CustomError('Category not found', 404);
        
        const notes = await NoteModel.find({ categoryId: req.params.categoryId });
        res.json(notes);
    } catch (error) {
        if (error instanceof CustomError) {
            next(error);
        } else {
            next(new CustomError('Failed to fetch notes by category', 500));
        }
    }
};

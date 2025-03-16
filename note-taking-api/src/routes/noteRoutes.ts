import express from 'express';
import {
    getAllNotes,
    getNoteById,
    createNote,
    deleteNote,
    updateNote,
    getNotesByCategory
} from '../controllers/noteController';
import { validateNote } from '../middlewares/validateNote';

const router = express.Router();

router.get('/api/notes', getAllNotes);
router.get('/api/notes/categories/:categoryId', getNotesByCategory);
router.get('/api/notes/:id', getNoteById);
router.post('/api/notes', validateNote, createNote);
router.delete('/api/notes/:id', deleteNote);
router.put('/api/notes/:id', validateNote, updateNote);

export default router;

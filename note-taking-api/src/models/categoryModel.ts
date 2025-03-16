import mongoose, { Schema, Document } from 'mongoose';
import { Category } from '../types/note';

const categorySchema: Schema = new Schema({
    name: { type: String, required: true }
});

const CategoryModel = mongoose.model<Category & Document>('Category', categorySchema);

export default CategoryModel;
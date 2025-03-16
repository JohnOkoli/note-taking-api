export interface Note {
    _id?: string; // Changed from id to _id and made optional for new documents
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    categoryId: string; // Reference to Category
}

export interface Category {
    _id?: string; // Changed from id to _id and made optional for new documents
    name: string;
}

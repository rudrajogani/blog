import { Schema, model, Types, Document } from 'mongoose';

export interface IBlog {
  title: string;
  body: string;
  coverImageurl?: string;
  createdBy: Types.ObjectId;
}

export interface IBlogDocument extends IBlog, Document {}

const blogSchema = new Schema<IBlogDocument>({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  coverImageurl: {
    type: String,
    required: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
}, { timestamps: true });

const Blog = model<IBlogDocument>('blog', blogSchema);

export default Blog;

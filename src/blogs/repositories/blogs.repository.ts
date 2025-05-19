import { Blog } from '../types/blog';
import { db } from '../../db/in-memory.db';
import { BlogInput } from '../dto/blog.input';

export const blogsRepository = {
  findAll(): Blog[] {
    return db.blogs;
  },

  findById(id: number): Blog | null {
    return db.blogs.find((d) => d.id === id) ?? null;
  },

  create(newBlog: Blog): Blog {
    db.blogs.push(newBlog);

    return newBlog;
  },

  update(id: number, dto: BlogInput): void {
    const blog = db.blogs.find((d) => d.id === id);

    if (!blog) {
      throw new Error('Blog do not exist');
    }

    blog.name = dto.name;
    blog.description = dto.description;
    blog.websiteUrl = dto.websiteUrl;

    return;
  },

  delete(id: number): void {
    const index = db.blogs.findIndex((v) => v.id === id);

    if (index === -1) {
      throw new Error('Blog do not exist');
    }

    db.blogs.splice(index, 1);
    return;
  },
};
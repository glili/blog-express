import { Blog } from '../types/blog';
import { db } from '../../db/in-memory.db';
import { BlogInput } from '../dto/blog.input';

export const blogsRepository = {
  findAll(): Blog[] {
    return db.blogs;
  },

  findById(id: string): Blog | null {
    return db.blogs.find((d) => String(d.id) === id) ?? null;
  },

  create(newBlog: Blog): Blog {
    db.blogs.push(newBlog);

    return newBlog;
  },

  update(id: string, dto: BlogInput): void {
    const blog = db.blogs.find((d) => String(d.id) === id);

    if (!blog) {
      throw new Error('Blog do not exist');
    }

    blog.name = dto.name;
    blog.description = dto.description;
    blog.websiteUrl = dto.websiteUrl;

    return;
  },

  delete(id: string): void {
    const index = db.blogs.findIndex((v) => String(v.id) === id);

    if (index === -1) {
      throw new Error('Blog do not exist');
    }

    db.blogs.splice(index, 1);
    return;
  },
};
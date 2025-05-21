import { Post } from '../types/post';
import { db } from '../../db/in-memory.db';
import { PostInput } from '../dto/post.input';

export const postsRepository = {
  findAll(): Post[] {
    return db.posts;
  },

  findById(id: string): Post | null {
    return db.posts.find((d) => d.id === id) ?? null;
  },

  create(newPost: Post): Post {
    db.posts.push(newPost);

    return newPost;
  },

  update(id: string, dto: PostInput): void {
    const post = db.posts.find((d) => d.id === id);

    if (!post) {
      throw new Error('Post do not exist');
    }

    post.title = dto.title;
    post.shortDescription = dto.shortDescription;
    post.content = dto.content;
    post.blogId = dto.blogId;

    return;
  },

  delete(id: string): void {
    const index = db.posts.findIndex((v) => v.id === id);

    if (index === -1) {
      throw new Error('Post do not exist');
    }

    db.posts.splice(index, 1);
    return;
  },
};
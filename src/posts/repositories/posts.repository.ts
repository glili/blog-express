import { Post } from '../types/post';
import { postCollection} from '../../db/mongo.db';
import { ObjectId, WithId } from 'mongodb';
import {PostInput} from "../dto/post.input";

export const postsRepository = {
  async findAll(): Promise<WithId<Post>[]> {
    return postCollection.find().toArray();
  },

  async findById(id: string): Promise<WithId<Post> | null> {
    return postCollection.findOne({ _id: new ObjectId(id) });
  },

  async findActivePostByBlogId(
      blogId: string,
  ): Promise<WithId<Post> | null> {
    return postCollection.findOne({ blogId, finishedAt: null });
  },

  async createPost(newPost: Post): Promise<WithId<Post>> {
    const insertResult = await postCollection.insertOne(newPost);

    return { ...newPost, _id: insertResult.insertedId };
  },

  async update(id: string, dto: PostInput): Promise<void> {
    const updateResult = await postCollection.updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            title: dto.title,
            shortDescription: dto.shortDescription,
            content: dto.content,
            blogId: dto.blogId,
          },
        },
    );

    if (updateResult.matchedCount < 1) {
      throw new Error('Post not exist');
    }
    return;
  },

  async delete(id: string): Promise<void> {
    const deleteResult = await postCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount < 1) {
      throw new Error('Post not exist');
    }
    return;
  },
};

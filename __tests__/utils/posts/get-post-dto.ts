import { PostInput } from '../../../src/posts/dto/post.input';

export function getPostDto(blogId: string): PostInput {
  return {
    blogId,
    title: 'imia',
    shortDescription: 'smth',
    content: 'cont',
  };
}
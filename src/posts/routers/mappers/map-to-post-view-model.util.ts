import { WithId } from 'mongodb';
import { Post } from '../../types/post';
import { PostViewModel } from '../../types/post-view-model';

export function mapToPostViewModelUtil(post: WithId<Post>): PostViewModel {
    return {
        id: post._id.toString(),
        blogId: post.blogId,
        blogName: post.blogName,
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        createdAt: post.createdAt,
    };
}
import { BlogInput } from '../../../src/blogs/dto/blog.input';

export function getBlogDto(): BlogInput {
  return {
    name: 'test',
    description: 'descr',
    websiteUrl: 'https://samurai.it-incubator.io/swagger?id=h02'

  };
}
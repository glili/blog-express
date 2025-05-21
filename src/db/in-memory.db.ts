import { Blog } from '../blogs/types/blog';
import { Post } from '../posts/types/post';


export const db = {
    blogs: <Blog[]>[
        {
            id: '1',
            name: 'title 1',
            description: 'test 1',
            websiteUrl:'https://github.com/it-incubator/',
        },
        {
            id:'2',
            name: 'title 2',
            description: 'test 2',
            websiteUrl:'https://github.com/it-incubator/',
        },
        {
            id: '3',
            name: 'title 3',
            description: 'test 3',
            websiteUrl:'https://github.com/it-incubator/',
        },
    ],
    posts: <Post[]>[

    ],
};
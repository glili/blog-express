export type PostViewModel = {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blog: {
        id: string;
        name: string;
    };
    createdAt: Date;
};
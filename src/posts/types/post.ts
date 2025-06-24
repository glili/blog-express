export type Post = {
  title: string;
  shortDescription: string;
  content: string;
  blog: {
    id: string;
    name: string;
  };
  createdAt: Date;

};
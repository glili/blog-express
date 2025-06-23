export const SETTINGS = {
    PORT: process.env.PORT || 5003,
    MONGO_URL:
        process.env.MONGO_URL ||
        'mongodb+srv://admin:admin@lesson.oxuydeq.mongodb.net/?retryWrites=true&w=majority&appName=lesson',
    DB_NAME: process.env.DB_NAME || 'blog-express-db',
};

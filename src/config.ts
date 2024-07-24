export default () => ({
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/nest',
    jwtKey: process.env.JWT_KEY,
    jwtExpiration: process.env.JWT_EXPIRATION || '5m',
});
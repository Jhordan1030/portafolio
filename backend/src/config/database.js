require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USER || 'portafolio_admin',
        password: process.env.DB_PASSWORD || 'jhordan123',
        database: process.env.DB_NAME || 'portafolio_db',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5434,
        dialect: 'postgres',
        logging: console.log,
    },
};
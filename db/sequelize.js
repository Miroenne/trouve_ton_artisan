const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE || 'db',
    process.env.TIDB_USER || 'root',
    process.env.PASSWORD || '',
    {
        host: process.env.HOST || '127.0.0.1',
        port: process.env.DB_PORT || 4000,
        dialect: 'mysql',
        logging: false,
        dialectOptions: {
            ssl: {
                minVersion: 'TLSv1.2',
                rejectUnauthorized: true,
            }
        }
    }
);

module.exports = sequelize;

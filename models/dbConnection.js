require('dotenv').config();
const Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.SQL_DATABASE, process.env.SQL_USERNAME, process.env.SQL_PASSWORD, {
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    dialect: process.env.SQL_DIALECT,
    pool: {
        max: 20,
        min: 5,
        idle: 30000,
        evict: 30000,
        acquire: 30000
    },
    logging: false
});

sequelize
    .authenticate()
    .then((err) => {
        if (err) {
            console.error(`Authenticate DB: ${err}`);
        } else {
            console.log(`Connection DB has connected on: ${process.env.SQL_DATABASE}`);
        }
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
        process.exit(0);
    });

module.exports = sequelize;

const mysqldump = require('mysqldump');
exports.getResult = () => {
    return mysqldump({
        connection: {
            host: process.env.SQL_HOST,
            user: process.env.SQL_USERNAME,
            password: process.env.SQL_PASSWORD,
            database: process.env.SQL_DATABASE,
        }
    });
};

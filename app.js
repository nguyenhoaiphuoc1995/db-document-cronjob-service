const app = require('express')();
const routes = require('./routes');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const compression = require('compression');
const cors = require('cors');

require('dotenv').config();
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
routes.loadRoutes(app);

var port = process.env.PORT;
app.listen(port, function () {
    console.log(`App running on port: ${port}`);
});

process.on('SIGINT', () => {
    require('./models').sequelize.close();
});

async function createFolders() {
    var pathFolderMySql = path.join(__dirname, '/mysql');
    if (!fs.existsSync(pathFolderMySql)) {
        await fs.mkdirSync(pathFolderMySql);
    }

    var pathFolderMigration = path.join(__dirname, '/migrations');
    if (!fs.existsSync(pathFolderMigration)) {
        await fs.mkdirSync(pathFolderMigration);
    }
}
createFolders();
module.exports = app;

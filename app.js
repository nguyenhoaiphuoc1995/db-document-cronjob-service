const app = require('express')();
const routes = require('./routes');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config()
const compression = require('compression');
const cors = require('cors');
const db = require('./models/dbConnection');

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
    db.close();
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

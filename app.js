const app = require('express')();
const routes = require('./routes');

app.use(require('compression')());
app.use(require('cors')());
routes.loadRoutes(app);

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`App running on port: ${port}`);
});

module.exports = app;

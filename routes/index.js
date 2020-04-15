exports.loadRoutes= (app) => {
    app.use('/api/cronjob', require('./cronjob.route'));
}
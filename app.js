const app = require('./config/server');
const routes = require('./app/routes/routes');

routes.home(app);
routes.work(app);
routes.portinari(app);
routes.tarsila(app);
routes.create(app);
routes.update(app);
routes.singup(app);
routes.singin(app);
routes.error(app);

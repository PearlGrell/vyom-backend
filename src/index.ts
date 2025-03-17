import express from 'express';
import ErrorMiddleware from './middlewares/error.middleware.js';
import router from './router.js';
import { settings } from './config/settings.js';
import { environment } from './types.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use('/api/', router)

app.use(ErrorMiddleware);

app.listen(settings.server.port, () => {
    console.log(settings.environment === environment.DEV ? `Server started on http://localhost:${settings.server.port}` : "");
});
import cors from 'cors';
import dotenv from 'dotenv';
import express, { json } from 'express';
import 'express-async-errors';
import router from './routes';
import errorsHandler from './middlewares/errorsHandler';

dotenv.config();

const app = express();

app.use([json(), cors()]);
app.use(router);
app.use(errorsHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server is up and running at port ${PORT}`));

import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlwares/globalErrorHandler';
import notFound from './app/middlwares/notFound';
import router from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Vehicle Rental System API is running...');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;

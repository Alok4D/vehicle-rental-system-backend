import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './middlwares/globalErrorHandler';
import notFound from './middlwares/notFound';
import router from './routes';

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

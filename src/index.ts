import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ExpressJoiError } from 'express-joi-validation';
import robotRouter from './robot/robot.router';
import { ErrorJsonResponse } from './common/jsonResponses';

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/', robotRouter);

// handle validation errors
app.use((err: ExpressJoiError,
  _req: Request,
  res: Response,
  next: NextFunction): ErrorJsonResponse|void => {
  if (err?.error?.message) {
    const response: ErrorJsonResponse = { error: err.error.message };
    res.status(400).json(response);
  }
  return next();
});
if (!process.env.PORT) console.warn('NO PORT IN ENV FOUND USING DEFAULT');
const port = process.env.PORT ? process.env.PORT : 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default app;

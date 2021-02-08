import express, { Response } from 'express';
import {
  ValidatedRequest,
  createValidator,
} from 'express-joi-validation';
import { getDirectionSchema, GetDirectionInterface } from './robot.validator';
import RobotController from './robot.controller';
import { DirectionResponse } from '../common/jsonResponses';

const robotRouter = express.Router();

const validator = createValidator({
  passError: true,
});

/**
 * get direction from heading and target
 * @Query heading number heading of the robot
 * @Query target number degree of the target
 */
robotRouter.get('/direction',
  validator.query(getDirectionSchema),
  (req: ValidatedRequest<GetDirectionInterface>, res: Response) => {
    const direction: string = RobotController.getDirection(req.query.heading, req.query.target);

    const response: DirectionResponse = { direction };
    res.json(response);
  });

export default robotRouter;

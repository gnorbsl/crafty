import {
  ContainerTypes,
  ValidatedRequestSchema,
} from 'express-joi-validation';
import Joi from 'joi';

export const getDirectionSchema = Joi.object({
  heading: Joi.number().min(0).max(359).required(),
  target: Joi.number().min(0).max(359).required(),
});

export interface GetDirectionInterface extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    heading: number,
    target: number
  }
}

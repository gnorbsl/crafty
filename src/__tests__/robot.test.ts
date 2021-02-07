import supertest from 'supertest';
import RobotController from '../robot/robot.controller';
import app from '../index';
import robotRouter from '../robot/robot.router';

const apiServer = supertest(app);

app.use('/', robotRouter);
describe('robot unit tests', () => {
  test('getDirection() with heading === target should return straight', () => {
    expect(RobotController.getDirection(10, 10)).toBe('straight');
  });
  test('getDirection() with heading 310 and target 75 should return right', () => {
    expect(RobotController.getDirection(310, 75)).toBe('right');
  });
  test('getDirection() with heading 75 and target 310 should return left', () => {
    expect(RobotController.getDirection(75, 310)).toBe('left');
  });
});

describe('testing robot routes', () => {
  describe('GET /direction', () => {
    it('should return validation error if heading and target is missing', async () => {
      const { body } = await apiServer.get('/direction');
      expect(body).toStrictEqual({ error: '"heading" is required. "target" is required' });
    });
    it('should return validation error if heading is missing', async (done) => {
      const { body } = await apiServer.get('/direction?target=75');
      expect(body).toStrictEqual({ error: '"heading" is required' });
      done();
    });
    it('should return validation error if target is missing', async () => {
      const { body } = await apiServer.get('/direction?heading=310');
      expect(body).toStrictEqual({ error: '"target" is required' });
    });
    it('should return validation error if target is above 359', async () => {
      const { body } = await apiServer.get('/direction?heading=399&target=75');
      expect(body).toStrictEqual({ error: '"heading" must be less than or equal to 359' });
    });
    it('should return validation error if heading is above 359', async () => {
      const { body } = await apiServer.get('/direction?heading=310&target=375');
      expect(body).toStrictEqual({ error: '"target" must be less than or equal to 359' });
    });
    it('should return validation error if heading is below 0', async () => {
      const { body } = await apiServer.get('/direction?heading=-15&target=75');
      expect(body).toStrictEqual({ error: '"heading" must be greater than or equal to 0' });
    });
    it('should return validation error if target is below 0', async () => {
      const { body } = await apiServer.get('/direction?heading=310&target=-75');
      expect(body).toStrictEqual({ error: '"target" must be greater than or equal to 0' });
    });
    it('should return straight if heading === target', async () => {
      const { body } = await apiServer.get('/direction?heading=310&target=310');
      expect(body).toStrictEqual({ direction: 'straight' });
    });
    it('should return left if heading=75 target=310', async () => {
      const { body } = await apiServer.get('/direction?heading=75&target=310');
      expect(body).toStrictEqual({ direction: 'left' });
    });
    it('should return straight if heading=310 target=75', async () => {
      const { body } = await apiServer.get('/direction?heading=310&target=75');
      expect(body).toStrictEqual({ direction: 'right' });
    });
  });
});

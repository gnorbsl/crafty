export default class RobotController {
  /**
     * Calculates the direction form heading and target and returns it as a string
     * @param heading
     * @param target
     */
  static getDirection(heading: number, target: number): string {
    if (heading === target) return 'straight';

    const placeHolder = heading - target;

    const side = placeHolder < 0 ? placeHolder + 360 : placeHolder;

    if (side > 180) {
      return 'right';
    }
    return 'left';
  }
}

<<<<<<< HEAD
/**
 * Creates a new Vector3 instance.
 * @param coords - The x, y, and z coordinates of the vector.
 * @class Vector3
 * @classdesc The class that handles Vector3 objects.
 * @example const coords = new Vector3([0, 0, 0]);
 */
export class Vector3 {
  /**
   * The x coordinate of the vector.
   */
  x: number;
  /**
   * The y coordinate of the vector.
   */
  y: number;
  /**
   * The z coordinate of the vector.
   */
  z: number;

=======
export class Vector3 {
  x: number;
  y: number;
  z: number;
>>>>>>> b9d8dcb (feat(add Vector3))
  constructor(coords: [number, number, number]) {
    this.x = coords[0];
    this.y = coords[1];
    this.z = coords[2];
    return this;
  }
}

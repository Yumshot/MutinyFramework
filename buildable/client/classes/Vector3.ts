/**
 * A class representing a 3D vector with x, y, and z coordinates.
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

  /**
   * Creates a new Vector3 object with the specified coordinates.
   * @param coords - An array containing the x, y, and z coordinates of the vector.
   */
  constructor(coords: [number, number, number]) {
    this.x = coords[0];
    this.y = coords[1];
    this.z = coords[2];
    return this;
  }
}

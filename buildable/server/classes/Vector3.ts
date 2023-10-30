<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 264a20d (Add Docs to all current files, to continue having a verbose documentation of this branch, this will most likely be merged shortly after i get a few systems squared away as they were previously.)
/**
 * Creates a new Vector3 instance.
 * @param coords - The x, y, and z coordinates of the vector.
 * @class Vector3
 * @classdesc The class that handles Vector3 objects.
 * @example const coords = new Vector3([0, 0, 0]);
 */
<<<<<<< HEAD
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
=======
>>>>>>> 264a20d (Add Docs to all current files, to continue having a verbose documentation of this branch, this will most likely be merged shortly after i get a few systems squared away as they were previously.)
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
<<<<<<< HEAD
>>>>>>> b9d8dcb (feat(add Vector3))
=======

>>>>>>> 264a20d (Add Docs to all current files, to continue having a verbose documentation of this branch, this will most likely be merged shortly after i get a few systems squared away as they were previously.)
  constructor(coords: [number, number, number]) {
    this.x = coords[0];
    this.y = coords[1];
    this.z = coords[2];
    return this;
  }
}

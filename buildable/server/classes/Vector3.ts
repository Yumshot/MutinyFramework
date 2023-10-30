export class Vector3 {
  x: number;
  y: number;
  z: number;
  constructor(coords: [number, number, number]) {
    this.x = coords[0];
    this.y = coords[1];
    this.z = coords[2];
    return this;
  }
}

export interface INpc {
  ped: number;
  title: string;
  job: string;
  bio: { first: string; last: string };
  coords: { x: number; y: number; z: number; heading: number };
  canMove: boolean;
  availableWork: boolean;
  jobLimit: number | null;
  currentJobs: any[];
  scenario: string | number | null;
  icon: string;
  distance: number;
}

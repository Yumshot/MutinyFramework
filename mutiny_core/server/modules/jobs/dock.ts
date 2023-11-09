let activeWorkers: any[] = [];

const jobs = {
  types: [
    "Loading",
    "Unloading",
    "Hauling",
    "Cleaning",
    "Boat Repair",
    "Boat Delivery",
  ],
  loading: {
    start: { x: -188.10989379882812, y: -2365.96484375, z: 9.3128662109375 },
    locations: [] as any[],
  },
  unloading: {
    start: {},
    locations: [] as any[],
  },
  hauling: {
    start: {},
    locations: [] as any[],
  },
  cleaning: {
    start: {},
    locations: [] as any[],
  },
  boatrepair: {
    start: {},
    locations: [] as any[],
  },
  boatdelivery: {
    start: {},
    locations: [] as any[],
  },
};

onNet("selectDockwork", (weight: any, workerGender: string) => {
  SelectRandomJob(source, weight, workerGender);
});

function SelectRandomJob(source: number, weight: any, workerGender: string) {
  const worker = {
    source: source,
    weight: weight,
    active: false,
    worker: workerGender,
    job: JobTypeSelect(),
  };
  console.log(worker);
  if (!activeWorkers.includes(worker)) {
    activeWorkers.push(worker);
  }
}
function JobTypeSelect() {
  const job = jobs.types[Math.floor(Math.random() * jobs.types.length)];
  return job.toLowerCase().replace(/\s/g, "");
}

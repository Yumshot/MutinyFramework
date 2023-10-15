export const Delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
export const Speed = (vehicle: number) => Math.floor(GetEntitySpeed(vehicle) * 2.236936);
export const Rpm = (vehicle: number) => Math.floor(GetVehicleCurrentRpm(vehicle) * 100);
export const VehicleHealth = (vehicle: number) => GetVehicleEngineHealth(vehicle);
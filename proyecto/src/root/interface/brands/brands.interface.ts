export interface LaborRegistration {
  idEmployee: string;
  cycle: { [key: string]: Cycle };
  hoursEmployee: { [Key: string]: HoursEmployee };
}

export interface HoursEmployee {
  hIni: string;
  hFin: string;
}
export interface Cycle {
  hours: { [key: string]: HourRange };
}
export interface HourRange {
  hFin: string;
  hIni: string;
}
export interface Complete_brands {
  cycle: { [key: string]: cycleDate };
}
export interface cycleDate {
  hours: { [key: string]: exactlyDate };
}
export interface exactlyDate {}

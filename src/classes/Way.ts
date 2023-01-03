import Station from "./Station";

export default class Way {
  id: number;
  dist: number;
  busName: string;
  canBus: boolean;
  canTaxi: boolean;
  busSpeed: number;
  taxiSpeed: number;
  from: Station;
  to: Station;

  constructor(
    id: number,
    dist: number,
    busName: string,
    canBus: boolean,
    canTaxi: boolean,
    busSpeed: number,
    taxiSpeed: number,
    from: Station,
    to: Station
  ) {
    this.id = id;
    this.dist = dist;
    this.busName = busName;
    this.canBus = canBus;
    this.canTaxi = canTaxi;
    this.busSpeed = busSpeed;
    this.taxiSpeed = taxiSpeed;
    this.from = from;
    this.to = to;
  }

  isEqual(way: Way | null): boolean {
    return way !== null && this.id === way.id;
  }

  getEffortCost(transport: string): number {
    return transport === "taxi"
      ? this.dist * -5
      : transport === "bus"
      ? this.dist * 5
      : this.dist * 10;
  }
  getMoneyCost(transport: string): number {
    return transport === "taxi"
      ? this.dist * 1000
      : transport === "bus"
      ? 400
      : 0;
  }
  getTimeCost(transport: string): number {
    return transport === "taxi"
      ? this.dist * this.taxiSpeed
      : transport === "bus"
      ? this.dist * this.busSpeed
      : 5.5 * this.dist;
  }
}

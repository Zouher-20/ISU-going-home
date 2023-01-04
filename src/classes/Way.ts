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
  higherMoney: boolean;
  higherHealth: boolean;
  best: boolean;

  constructor(
    id: number,
    dist: number,
    busName: string,
    canBus: boolean,
    canTaxi: boolean,
    busSpeed: number,
    taxiSpeed: number,
    from: Station,
    to: Station,
    higherMoney: boolean,
    higherHealth: boolean,
    best: boolean
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
    this.higherMoney = higherMoney;
    this.higherHealth = higherHealth;
    this.best = best;
  }

  isEqual(way: Way | null): boolean {
    return way !== null && this.id === way.id;
  }

  getEffortCost(transport: string): number {
    return transport === "Taxi"
      ? this.dist * -5
      : transport === "Bus"
      ? this.dist * 5
      : this.dist * 10;
  }
  getMoneyCost(transport: string): number {
    return transport === "Taxi"
      ? this.dist * 1000
      : transport === "Bus"
      ? 400
      : 0;
  }
  getTimeCost(transport: string): number {
    return transport === "Taxi"
      ? this.dist / this.taxiSpeed
      : transport === "Bus"
      ? this.dist / this.busSpeed
      : this.dist / 5.5;
  }
}

export default class Way {
  dist: number;
  busName: string;
  canBus: boolean;
  canTaxi: boolean;
  busSpeed: number;
  taxiSpeed: number;

  constructor(
    dist: number,
    busName: string,
    canBus: boolean,
    canTaxi: boolean,
    busSpeed: number,
    taxiSpeed: number
  ) {
    this.dist = dist;
    this.busName = busName;
    this.canBus = canBus;
    this.canTaxi = canTaxi;
    this.busSpeed = busSpeed;
    this.taxiSpeed = taxiSpeed;
  }
}

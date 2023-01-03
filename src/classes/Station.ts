export default class Station {
  busTime: number;
  taxiTime: number;
  isHome: boolean;

  constructor(busTime = 0, taxiTime = 0, isHome = false) {
    this.busTime = busTime;
    this.taxiTime = busTime;
    this.isHome = isHome;
  }
}

export default class Station {
  id: number;
  busTime: number;
  taxiTime: number;
  isHome: boolean;

  constructor(id: number, busTime = 0, taxiTime = 0, isHome = false) {
    this.busTime = busTime;
    this.taxiTime = busTime;
    this.isHome = isHome;
    this.id = id;
  }

  isEqual(station: Station): boolean {
    return this.id === station.id;
  }
}

export default class Station {
  id: number;
  busTime: number;
  taxiTime: number;
  isHome: boolean;
  trans: string;
  constructor(
    id: number,
    busTime = 0,
    taxiTime = 0,
    isHome = false,
    trans = ""
  ) {
    this.busTime = busTime;
    this.taxiTime = busTime;
    this.isHome = isHome;
    this.id = id;
    this.trans = trans;
  }

  isEqual(station: Station): boolean {
    return this.id === station.id;
  }
}

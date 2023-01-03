import City from "./City";
import State from "./State";

export default class Trip {
  city: City;
  currentState: State;
  constructor(city: City) {
    this.city = city;
    this.currentState = new State();
  }
  goOn(currentState) {}
}

import City from "./City";
import Station from "./Station";
import Way from "./Way";

export default class State {
  timeCost: number;
  currentMoney: number;
  currentHealth: number;
  parent: State | null;
  currentStation: Station;
  currentWay: Way | null;
  pathHeuristic: number;
  city: City;

  constructor(
    timeCost: number,
    currentMoney: number,
    currentHealth: number,
    currentStation: Station,
    parent: State | null = null,
    currentWay: Way | null = null,
    city: City,
    pathHeuristic = 0
  ) {
    this.timeCost = timeCost;
    this.currentMoney = currentMoney;
    this.currentHealth = currentHealth;
    this.currentStation = currentStation;
    this.parent = parent;
    this.currentWay = currentWay;
    this.city = city;
    this.pathHeuristic = pathHeuristic;
  }

  canMove(way: Way, transportType: string): boolean {
    if (this.currentHealth < way.getEffortCost(transportType)) return false;
    if (this.currentHealth < way.getMoneyCost(transportType)) return false;
    if (transportType === "Bus" && !way.canBus) return false;
    if (transportType === "Taxi" && !way.canTaxi) return false;

    return true;
  }

  getNextStates(thisState: State): Array<State> {
    var nextSates: Array<State> = [];
    var nextStations = this.city.cityGraph.get(this.currentStation);
    console.log("next stations", nextStations);

    nextStations?.forEach((el) => {
      var nextStation = el.station;

      // i Create three new States by the three transportations

      if (this.canMove(el.way, "Taxi")) {
        var nextTimeCostIfTaxi = el.way.getTimeCost("Taxi") + this.timeCost;
        var nextMoneyIfTaxi = this.currentMoney - el.way.getMoneyCost("Taxi");
        var nextHealth = this.currentHealth + 5 * el.way.dist;
        var nextState = new State(
          nextTimeCostIfTaxi,
          nextMoneyIfTaxi,
          nextHealth,
          nextStation,
          thisState,
          el.way,
          this.city,
          thisState.pathHeuristic + thisState.heuristic()
        );
        nextSates.push(nextState);
      }
      console.log("next station if taxi", this.canMove(el.way, "Taxi"));

      if (this.canMove(el.way, "Bus")) {
        var nextTimeCostIfBus = el.way.getTimeCost("Bus") + this.timeCost;

        //  Check if the next way is the same bus name or not

        var nextMoneyIfBus =
          el.way.busName === this.currentWay?.busName
            ? this.currentMoney
            : this.currentMoney - el.way.getMoneyCost("bus");
        var nextHealth = this.currentHealth - 5 * el.way.dist;
        var nextState = new State(
          nextTimeCostIfBus,
          nextMoneyIfBus,
          nextHealth,
          nextStation,
          thisState,
          el.way,
          this.city,
          thisState.pathHeuristic + thisState.heuristic()
        );
        nextSates.push(nextState);
      }
      console.log("next station if Bus", this.canMove(el.way, "Bus"));

      if (this.canMove(el.way, "Walking")) {
        var nextTimeCostIfWalking =
          el.way.getTimeCost("Walking") + this.timeCost;
        var nextHealth = this.currentHealth - 10 * el.way.dist;
        var nextState = new State(
          nextTimeCostIfWalking,
          this.currentMoney,
          nextHealth,
          nextStation,
          thisState,
          el.way,
          this.city,
          thisState.pathHeuristic + thisState.heuristic()
        );
        nextSates.push(nextState);
      }
      console.log("next station if Walking", this.canMove(el.way, "Walking"));
    });
    return nextSates;
  }
  isEqual(state: State): boolean {
    return (
      this.currentHealth === state.currentHealth &&
      this.currentMoney === state.currentMoney &&
      this.timeCost === state.timeCost &&
      this.currentWay !== null &&
      this.currentWay.isEqual(state.currentWay) &&
      this.currentStation.isEqual(state.currentStation)
    );
  }

  isFinal(): boolean {
    return false;
  }
  checkIfFinal(): boolean {
    if (this.currentStation.isHome) return true;
    return false;
  }
  heuristic(): number {
    var res = 0;
    res += 100 - this.currentHealth;
    res += this.timeCost;
    // TODO Change 100 to actual init money
    res += 100 - this.currentMoney;
    return res;
  }
}

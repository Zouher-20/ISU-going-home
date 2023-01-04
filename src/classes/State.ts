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
  heuristic(): number {
    if (this.city.higherMoney) return 5000 - this.currentMoney;
    else if (this.city.higherHealth) return 100 - this.currentHealth;
    else {
      var res = 0;
      res += 100 - this.currentHealth;
      res += this.timeCost;
      // TODO Change 100 to actual init money
      res += 5000 - this.currentMoney;
      return res;
    }
  }
  canMove(way: Way, transportType: string): boolean {
    if (this.currentHealth < way.getEffortCost(transportType)) return false;
    if (this.currentMoney < way.getMoneyCost(transportType)) return false;
    if (transportType === "Bus" && !way.canBus) return false;
    if (transportType === "Taxi" && !way.canTaxi) return false;

    return true;
  }

  getNextStates(thisState: State): Array<State> {
    var nextSates: Array<State> = [];
    var nextStations = this.city.cityGraph.get(this.currentStation);

    nextStations?.forEach((el) => {
      var nextStation = el.station;

      // i Create three new States by the three transportations

      if (this.canMove(el.way, "Taxi")) {
        nextStation.trans = "Taxi";
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

      if (this.canMove(el.way, "Bus")) {
        nextStation.trans = "Bus";
        var nextTimeCostIfBus = el.way.getTimeCost("Bus") + this.timeCost;

        //  Check if the next way is the same bus name or not

        var nextMoneyIfBus =
          el.way.busName === this.currentWay?.busName
            ? this.currentMoney
            : this.currentMoney - el.way.getMoneyCost("Bus");
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

      if (this.canMove(el.way, "Walking")) {
        nextStation.trans = "Walking";
        var nextTimeCostIfWalking =
          el.way.getTimeCost("Walking") + this.timeCost;
        var nextHealth = this.currentHealth - 10 * el.way.dist;
        var nextMoneyIfWalking =
          this.currentMoney - el.way.getMoneyCost("Walking");
        var nextState = new State(
          nextTimeCostIfWalking,
          nextMoneyIfWalking,
          nextHealth,
          nextStation,
          thisState,
          el.way,
          this.city,
          thisState.pathHeuristic + thisState.heuristic()
        );
        nextSates.push(nextState);
      }
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
}

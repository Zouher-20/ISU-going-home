import City from "./City";
import Index from "./Index";
import Station from "./Station";
import Way from "./Way";

export default class State {
  timeCost: number;
  currentMoney: number;
  currentHealth: number;
  parent: State | null;
  currentStation: Station;
  currentWay: Way | null;

  constructor(
    timeCost: number,
    currentMoney: number,
    currentHealth: number,
    currentStation: Station,
    parent: State | null = null,
    currentWay: Way | null = null
  ) {
    this.timeCost = timeCost;
    this.currentMoney = currentMoney;
    this.currentHealth = currentHealth;
    this.currentStation = currentStation;
    this.parent = parent;
    this.currentWay = currentWay;
  }
  isFinal(): boolean {
    return false;
  }

  canMove(way: Way, transportType: string): boolean {
    if (this.currentHealth < way.getEffortCost(transportType)) return false;
    if (this.currentHealth < way.getMoneyCost(transportType)) return false;
    if (transportType === "Bus" && !way.canBus) return false;
    if (transportType === "Taxi" && !way.canTaxi) return false;

    return true;
  }

  getNextStates(thisState: State, city: City): Array<State> {
    var nextSates: Array<State> = [];
    var nextStations = city.cityGraph.get(this.currentStation);
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
          thisState
        );
        nextSates.push(nextState);
      }
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
          thisState
        );
        nextSates.push(nextState);
      }
      if (this.canMove(el.way, "Walking")) {
        var nextTimeCostIfWalking =
          el.way.getTimeCost("Walking") + this.timeCost;
        var nextHealth = this.currentHealth - 10 * el.way.dist;
        var nextState = new State(
          nextTimeCostIfWalking,
          this.currentMoney,
          nextHealth,
          nextStation,
          thisState
        );
        nextSates.push(nextState);
      }
    });
    return nextSates;
  }

  // heuristic() : number {}

  // checkIfFinal(): boolean {}
}

import PriorityQueue from "ts-priority-queue";
import State from "./State";

export default class AStar {
  resultStates: Array<State>;
  visited: Array<State>;
  ansState: State | null;
  arrayAns: PriorityQueue<State>;

  constructor(isBestMoney: boolean, isBestHealth: boolean, isBest: boolean) {
    this.resultStates = [];
    this.visited = [];
    this.ansState = null;

    if (isBestMoney) {
      this.arrayAns = new PriorityQueue({
        comparator: function (a: State, b: State) {
          return a.currentMoney - b.currentMoney;
        },
      });
    } else if (isBestHealth) {
      this.arrayAns = new PriorityQueue({
        comparator: function (a: State, b: State) {
          return a.currentHealth - b.currentHealth;
        },
      });
    } else {
      this.arrayAns = new PriorityQueue({
        comparator: function (a: State, b: State) {
          return b.heuristic() - a.heuristic();
        },
      });
    }
  }
  getResult(): Array<State> {
    return this.resultStates;
  }

  checkIfVisited(state: State): Boolean {
    for (let index = 0; index < this.visited.length; index++) {
      const visitedState = this.visited[index];
      if (state.isEqual(visitedState)) {
        return true;
      }
    }
    return false;
  }

  solve(initState: State) {
    this.resultStates.push(initState);
    var queue = new PriorityQueue({
      comparator: function (a: State, b: State) {
        return (
          a.pathHeuristic + a.heuristic() - (b.pathHeuristic + b.heuristic())
        );
      },
    });
    queue.queue(initState);
    while (queue.length > 0) {
      var currentState: State = queue.dequeue();
      if (currentState.checkIfFinal()) {
        this.ansState = currentState;
        break;
      }
      const isVisited = this.checkIfVisited(currentState);
      if (isVisited) {
        continue;
      } else {
        this.visited.push(currentState);
      }
      var nextStates: Array<State> = currentState.getNextStates(currentState);

      for (let index = 0; index < nextStates.length; index++) {
        const nextState = nextStates[index];
        queue.queue(nextState);
      }
    }
    console.log("final astar", this.ansState);
  }

  getAnsPath() {
    var state = this.ansState;
    var path: Array<State> = [];
    while (state?.parent) {
      path.push(state);
      state = state.parent;
    }
    if (state) path.push(state);
    return path.reverse();
  }
}

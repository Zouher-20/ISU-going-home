import PriorityQueue from "ts-priority-queue";
import State from "./State";

export default class UCS {
  resultStates: Array<State>;
  visited: Array<State>;
  ansState: State | null;
  results: PriorityQueue<State>;
  constructor() {
    this.resultStates = [];
    this.visited = [];
    this.ansState = null;
    this.results = new PriorityQueue({
      comparator: function (a: State, b: State) {
        return b.cost - a.cost;
      },
    });
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
    var queue = new PriorityQueue({
      comparator: function (a: State, b: State) {
        return b.cost - a.cost;
      },
    });

    initState.cost = 0;
    queue.queue(initState);
    this.visited.push(initState);
    while (queue.length > 0) {
      var currentState: State = queue.dequeue();
      if (currentState.checkIfFinal()) {
        console.log(currentState);

        this.results.queue(currentState);
      }
      this.visited.push(currentState);
      var nextStates: Array<State> = currentState.getNextStates(currentState);
      for (let index = 0; index < nextStates.length; index++) {
        const nextState = nextStates[index];
        const isVisited = this.checkIfVisited(nextState);
        if (isVisited) {
          continue;
        } else {
          queue.queue(nextState);
          this.visited.push(nextState);
        }
      }
    }
    this.ansState = this.results.peek();
  }

  getAnsPath() {
    var state = this.ansState;
    var path: Array<State> = [];
    while (state?.parent) {
      path.push(state);
      state = state.parent;
    }
    return path.reverse();
  }
}

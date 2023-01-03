import PriorityQueue from "ts-priority-queue";
import State from "./State";

export default class BFS {
  resultStates: Array<State>;
  visited: Array<State>;
  ansState: State | null;
  constructor() {
    this.resultStates = [];
    this.visited = [];
    this.ansState = null;
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
    initState.cost = 0;
    var queue = new PriorityQueue({
      comparator: function (a: State, b: State) {
        return b.cost + b.heuristic() - (a.cost + a.heuristic());
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

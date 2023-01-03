import State from "./State";

export default class BFS {
  resultStates: Array<State>;
  bfsStates: Array<State>;
  visited: Array<State>;
  ansState: State | null;
  constructor() {
    this.resultStates = [];
    this.bfsStates = [];
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
    var queue: Array<State> = [];
    queue.push(initState);
    while (queue.length > 0) {
      var currentState: State = queue[0];
      queue.splice(0, 1);
      this.bfsStates.push(currentState);
      if (currentState.checkIfFinal()) {
        this.ansState = currentState;
        break;
      }
      this.visited.push(currentState);
      var nextStates: Array<State> = currentState.getNextStates(currentState);
      for (let index = 0; index < nextStates.length; index++) {
        const nextState = nextStates[index];
        const isVisited = this.checkIfVisited(nextState);
        if (isVisited) {
          continue;
        } else {
          queue.push(nextState);
          this.visited.push(nextState);
        }
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

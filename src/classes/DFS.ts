import State from "./State";

export default class DFS {
  resultStates: Array<State>;
  dfsStates: Array<State>;
  visited: Array<State>;
  constructor() {
    this.resultStates = [];
    this.dfsStates = [];
    this.visited = [];
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
    var stack: Array<State> = [];
    stack.push(initState);
    while (stack.length > 0) {
      var currentState: State | undefined = stack.pop();
      if (currentState) {
        this.dfsStates.push(currentState);
        if (currentState.checkIfFinal()) {
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
            stack.push(nextState);
            this.visited.push(nextState);
          }
        }
      }
    }
  }

  printAllStates() {
    console.log(`DFS States Count  : ${this.dfsStates.length}`);
    console.log(`DFS States Count  : ${this.dfsStates.length}`);
  }
}

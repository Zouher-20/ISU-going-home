export function craftLevel(n: number) {
  var level: Array<Array<string>> = [];
  for (let i = 0; i < n + n - 1; i++) {
    level[i] = [];
    for (let j = 0; j < n + n - 1; j++) {
      if ((i < n - 1 && j >= n) || (i >= n && j < n - 1)) level[i][j] = "black";
      if (i < n && j < n) level[i][j] = "red";
      if (i >= n - 1 && j >= n - 1) level[i][j] = "blue";
    }
  }
  level[n - 1][n - 1] = "mover";
  return level;
}

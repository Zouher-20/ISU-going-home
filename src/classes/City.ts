import Station from "./Station";
import Way from "./Way";

export default class City {
  cityGraph: Map<Station, Array<{ station: Station; way: Way }>>;
  constructor(stations: Array<Station>, ways: Array<Way>) {
    this.cityGraph = new Map<Station, Array<{ station: Station; way: Way }>>();
    ways.forEach((way) => {
      if (this.cityGraph.get(way.from)) {
        this.cityGraph.set(way.from, [
          ...this.cityGraph.get(way.from),
          { station: way.to, way },
        ]);
      } else {
        this.cityGraph.set(way.from, [{ station: way.to, way }]);
      }
    });
    console.log(this.cityGraph);
  }
}

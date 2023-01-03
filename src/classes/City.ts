import Station from "./Station";
import Way from "./Way";

export default class City {
  cityGraph: Map<Station, Array<{ station: Station; way: Way }>>;

  constructor() {}
}

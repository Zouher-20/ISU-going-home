<script setup lang="ts">
import { reactive } from "vue";
import Station from "./classes/Station";
import Way from "./classes/Way";
import City from "./classes/City";
import State from "./classes/State";
import AStar from "./classes/AStar";
var Stations: Array<Station> = reactive([]);
var ways: Array<Way> = reactive([]);
var city;
var bestModel = {
  higherMoney: false,
  higherHealth: false,
  best: false,
};
var initWay = {
  dist: 0,
  busName: "",
  canBus: false,
  canTaxi: false,
  busSpeed: 0,
  taxiSpeed: 0,
  from: null,
  to: null,
};
var way = reactive({ ...initWay });

var initStation = {
  taxiTime: 0,
  busTime: 0,
  isHome: false,
  trans: "",
};
var station = reactive({ ...initStation });

function addStation() {
  var toAdd = new Station(
    Stations.length,
    station.busTime,
    station.taxiTime,
    station.isHome,
    station.trans
  );
  Stations.push(toAdd);

  // station = reactive({ ...initStation });
}
function addWay() {
  var toAdd = new Way(
    ways.length,
    way.dist,
    way.busName,
    way.canBus,
    way.canTaxi,
    way.busSpeed,
    way.taxiSpeed,
    way.from,
    way.to
  );
  ways.push(toAdd);
}
function solve() {
  var aStar = new AStar(
    bestModel.higherMoney,
    bestModel.higherHealth,
    bestModel.best
  );
  city = new City(
    Stations,
    ways,
    bestModel.higherMoney,
    bestModel.higherHealth,
    bestModel.best
  );
  var initState = new State(0, 5000, 100, Stations[0], null, null, city);
  aStar.solve(initState);
}
</script>

<template>
  <div>
    <div style="font-size: xxx-large; margin-bottom: 25px">
      ISU <span class="blue">2022-2023</span> Homework
    </div>
    <div style="font-size: xx-large; margin-bottom: 25px">Stations :</div>
    <div v-for="(st, i) in Stations" :key="i" class="form">
      <div>
        {{ i }}
      </div>
      <div>
        {{ st.busTime }}
      </div>
      <div>
        {{ st.taxiTime }}
      </div>
      <div>
        {{ st.isHome }}
      </div>
    </div>
    <form class="form" @submit.prevent="addStation">
      <div class="form-input">
        <label for="bus-time">Bus Time</label>
        <input
          v-model="station.busTime"
          id="bus-time"
          type="number"
          name="busTime"
        />
      </div>
      <div class="form-input">
        <label for="taxi-time">Taxi Time</label>
        <input
          v-model="station.taxiTime"
          id="taxi-time"
          type="number"
          name="taxiTime"
        />
      </div>
      <div class="form-input">
        <label for="is-Home">is Home</label>
        <input
          v-model="station.isHome"
          type="checkbox"
          id="is-Home"
          name="isHome"
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>

    <div style="margin-top: 40px; font-size: xx-large; margin-bottom: 25px">
      Ways :
    </div>
    <div v-for="(w, i) in ways" :key="i" class="form-way">
      <div>
        {{ i }}
      </div>
      <div>
        {{ w.dist }}
      </div>
      <div>
        {{ w.canBus }}
      </div>
      <div>
        {{ w.busSpeed }}
      </div>
      <div>
        {{ w.busName }}
      </div>
      <div>
        {{ w.canTaxi }}
      </div>
      <div>
        {{ w.taxiSpeed }}
      </div>
    </div>
    <form class="form-way" @submit.prevent="addWay">
      <div class="form-input">
        <label for="station">From</label>
        <select v-model="way.from">
          <option :value="op" v-for="(op, i) in Stations" :key="i">
            station {{ i }}
          </option>
        </select>
      </div>
      <div class="form-input">
        <label for="station">To</label>
        <select v-model="way.to">
          <option :value="op" v-for="(op, i) in Stations" :key="i">
            station {{ i }}
          </option>
        </select>
      </div>
      <div class="form-input">
        <label for="dist">Dist</label>
        <input v-model="way.dist" id="dist" type="number" name="dist" />
      </div>
      <div class="form-input">
        <label for="can-bus">Can bus</label>
        <input
          v-model="way.canBus"
          type="checkbox"
          id="can-bus"
          name="canBus"
        />
      </div>
      <div class="form-input">
        <label for="bus-speed">Bus speed</label>
        <input
          v-model="way.busSpeed"
          id="bus-speed"
          type="number"
          name="busSpeed"
        />
      </div>
      <div class="form-input">
        <label for="bus-name">Bus name</label>
        <input v-model="way.busName" id="bus-name" type="text" name="busname" />
      </div>
      <div class="form-input">
        <label for="can-taxi">Can taxi</label>
        <input
          v-model="way.canTaxi"
          type="checkbox"
          id="can-taxi"
          name="cantaxi"
        />
      </div>
      <div class="form-input">
        <label for="taxi-speed">taxi speed</label>
        <input
          v-model="way.taxiSpeed"
          id="taxi-speed"
          type="number"
          name="taxiSpeed"
        />
      </div>

      <div>
        <button type="submit">Add</button>
      </div>
    </form>
    <div style="display: flex; justify-content: center; margin-top: 10px">
      <div class="solve-btn" style="margin-right: 40px; margin-top: 10px">
        <button @click="solve">solve</button>
      </div>
      <div class="form-input" style="margin-right: 40px">
        <label for="higher-money">With least money cost </label>
        <input
          v-model="bestModel.higherMoney"
          type="checkbox"
          id="higher-money"
          name="higherMoney"
        />
      </div>
      <div class="form-input" style="margin-right: 40px">
        <label for="higher-health">With least health loss</label>
        <input
          v-model="bestModel.higherHealth"
          type="checkbox"
          id="higher-health"
          name="higherHealth"
        />
      </div>
      <div class="form-input">
        <label for="higher-health"
          >with Best Time , least money cost , least health loss</label
        >
        <input
          v-model="bestModel.best"
          type="checkbox"
          id="higher-health"
          name="higherHealth"
        />
      </div>
    </div>

    <!-- <div
      style="
        display: flex;
        gap: 40px;
        justify-content: center;
        width: 50vw;
        flex-wrap: wrap;
        margin-top: 10px;
      "
      v-if="solvedAStar"
    >
      <div class="moves-cont" style="width: 100%; margin: 20px 0px">
        A* States Visited : {{ aStar.visited.length }}
      </div>
      <table v-for="state in aStar.visited" class="state-grid">
        <tbody>
          <tr v-for="(row, i) in state.getGrid()">
            <td v-for="(cell, j) in row" :class="`bg-${cell}`"></td>
          </tr>
        </tbody>
      </table>
    </div> -->
  </div>
</template>

<style>
.solve-btn {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
}
.form {
  display: grid;
  grid-template-columns: auto auto auto auto;
  column-gap: 10px;
  align-items: center;
}
.form-way {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto auto auto;
  column-gap: 10px;
  align-items: center;
}
.form-input {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: flex-start;
}
.form-input input[type="number"],
.form-input input[type="text"] {
  flex-shrink: 1;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem;
  border: 1px solid var(--blue);
  border-radius: var(--rounded-btn, 0.5rem);
  height: 2rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.form-input input:focus {
  outline: rgb(33, 33, 141) solid 3px;
}
</style>

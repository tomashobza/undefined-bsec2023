import type { MealRecord, MealType, Restaurant } from "./interfaces";
import { writable, get } from "svelte/store"
import _ from "lodash-es"

const STORAGE_KEY = "data"

interface StorageJson {
  restaurants: Restaurant[],
  mealTypes: MealType[],
  records: MealRecord[]
}

export class Storage {
  data: StorageJson;

  constructor() {
    const loadedData = localStorage.getItem(STORAGE_KEY);

    console.log({loadedData})

    if (!loadedData) {
      this.data = {restaurants: [], mealTypes: [], records: []}
      this.save();
    } else {
      this.data = JSON.parse(loadedData);
    }
  }

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
  }

  appendRestaurant(data: Restaurant) {
    this.data.restaurants.push(data);
    this.save();
  }

  appendMealType(data: MealType) {
    this.data.mealTypes.push(data);
    this.save();
  }

  appendMealRecord(data: MealRecord) {
    this.data.records.push(data)
    this.save();
  }

  updateMealRecord(id: string, data: MealRecord) {
    const recordIndex = _.findIndex(this.data.records, (i: MealRecord) => i.id === id)

    this.data.records[recordIndex] = data;

    this.save();
  }

  clear() {
    this.data = {restaurants: [], mealTypes: [], records: []}
    this.save();
  }
}

const storageInstance = writable<Storage | null>(null)

export function getStorage(): Storage {
  let instance = get(storageInstance);

  if (!instance) {
    instance = new Storage();
    storageInstance.set(instance);
  }

  return instance;
}
import type { Restaurant } from "./interfaces";
import { writable, get } from "svelte/store"

const STORAGE_KEY = "data"

interface StorageJson {
  restaurants: Restaurant[],
}

export class Storage {
  data: StorageJson;

  constructor() {
    const loadedData = localStorage.getItem(STORAGE_KEY);

    console.log({loadedData})

    if (!loadedData) {
      this.data = {restaurants: []}
      this.save();
    } else {
      this.data = JSON.parse(loadedData);
    }
  }

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
  }

  appendRestaurant(data: Restaurant) {
    this.data.restaurants.push(data)
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
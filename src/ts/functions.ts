import type { Restaurant } from "./interfaces";
import { getStorage } from "./storage";

export interface Meal {
  name: string
}

function getRandomId(): string {
  return (Math.random() * 10000000000000000).toString()
}

export function saveRestaurant(name: string) {
  const data: Restaurant = {
    id: getRandomId(),
    name,
  }

  getStorage().appendRestaurant(data);

  return data;
}

export function getRestaurants(): Restaurant[] {
  return getStorage().data.restaurants;
}
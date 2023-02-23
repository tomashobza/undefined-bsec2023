import type { MealRecord, MealType, Restaurant } from "./interfaces";
import { getStorage } from "./storage";

export interface Meal {
  name: string
}

function getRandomId(): string {
  return (Math.random() * 10000000000000000).toString()
}

export function saveRestaurant(name: string): Restaurant {
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

export function saveMealType(restaurantId: string, name: string): MealType {
  const data: MealType = {
    id: getRandomId(),
    restaurantId,
    name,
  }

  getStorage().appendMealType(data);

  return data;
}

export function getMealTypes(search?: string): MealType[] {
  const mealTypes = getStorage().data.mealTypes;

  if (!search) {
    return mealTypes;
  }

  return mealTypes.filter((i: MealType) => i.name === search);
}

export function saveMealRecord(mealTypeId: string, init: number, dose: number): MealRecord {
  const data: MealRecord = {
    id: getRandomId(),
    dose,
    mealTypeId,
    init,
  }

  getStorage().appendMealRecord(data);

  return data;
}

export function getMealRecords(): MealRecord[] {
  return getStorage().data.records;
}

export function updateMealRecord(recordId: string, result: number): MealRecord {
  const record = getStorage().data.records.find(i => i.id === recordId);

  if (!record) {
    throw new Error("Record not found.")
  }

  record.result = result;

  getStorage().updateMealRecord(recordId, record);

  return record;
}
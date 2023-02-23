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

export function getMealRecordsOfType(typeId: string): MealRecord[] {
  const allRecords = getMealRecords();

  const ofType = allRecords.filter((r) => r.mealTypeId === typeId)

  return ofType;
}

export function calculateBolus(mealTypeId: string): {a: number, b: number, avgJVB: number} {
  const records = getMealRecordsOfType(mealTypeId);

  // least square calculations
  const x: number[] = [];
  const y: number[] = [];
  const x2: number[] = [];
  const xy: number[] = [];
  const jvbs: number[] = [];

  records.forEach((foodRecord: MealRecord) => {
    if (!foodRecord.result) {
      return
    }

    x.push(foodRecord.result - foodRecord.init);
    x2.push((foodRecord.result - foodRecord.init) * (foodRecord.result - foodRecord.init));
    y.push(foodRecord.dose);
    xy.push((foodRecord.result - foodRecord.init) * foodRecord.dose);
    jvbs.push(foodRecord.dose + (foodRecord.result - foodRecord.init));
  });


  records.forEach((foodRecord: MealRecord) => {
    if (!foodRecord.result) {
      return
    }

    x.push(foodRecord.result - foodRecord.init);
    x2.push((foodRecord.result - foodRecord.init) * (foodRecord.result - foodRecord.init));
    y.push(foodRecord.dose);
    xy.push((foodRecord.result - foodRecord.init) * foodRecord.dose);
    jvbs.push(foodRecord.dose + (foodRecord.result - foodRecord.init));
  });

  const sumXY = xy.reduce((a, v) => a+v);
  const sumX = x.reduce((a, v) => a+v);
  const sumX2 = x2.reduce((a, v) => a+v);
  const sumY = y.reduce((a, v) => a+v);
  const avgJVB = jvbs.reduce((a, v) => a+v) / jvbs.length;

  // calculate y=mx+b for bolus
  const b = (x.length*sumXY - sumX*sumY)/(x.length*sumX2 - sumX*sumX) || 0;
  const a = (sumY - b*sumX)/x.length;

  return {a, b, avgJVB};
}

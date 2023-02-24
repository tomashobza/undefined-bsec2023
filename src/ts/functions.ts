import type { MealRecord, MealType, Restaurant } from "./interfaces";
import { getStorage } from "./storage";
import type dayjs from "dayjs"

function getRandomId(): string {
  return (Math.random() * 100000000000000000).toString()
}

export function saveRestaurant(name: string, geoLat: number, geoLong: number): Restaurant {
  const data: Restaurant = {
    id: getRandomId(),
    name,
    geoLat,
    geoLong
  }

  getStorage().appendRestaurant(data);

  return data;
}

export function getRestaurants(): Restaurant[] {
  return getStorage().data.restaurants;
}

export function getRestaurantById(id: string): Restaurant | null {
  return getStorage().data.restaurants.find(r => r.id === id) || null;
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

export function getMealTypeById(id: string): MealType | null{
  return getStorage().data.mealTypes.find(r => r.id === id) || null;
}

export function saveMealRecord(mealTypeId: string, init: number, dose: number, datetime: dayjs.Dayjs, result?: number): MealRecord {
  const data: MealRecord = {
    id: getRandomId(),
    dose,
    mealTypeId,
    init,
    dateTime: datetime.unix(),
    result
  }

  getStorage().appendMealRecord(data);

  // Default delay is 2 hours
  planNotificationForMeal(data.id, 5)

  return data;
}

export function getMealRecords(): MealRecord[] {
  return getStorage().data.records;
}

export function getSortedMealRecordsByDate(): MealRecord[] {
  return getMealRecords().sort(r => -r.dateTime)
}

export function getFilteredMealRecords(restaurantId?: string, mealTypeId?: string): MealRecord[] {
  const records = getSortedMealRecordsByDate();

  if (!restaurantId) {
    return records;
  }

  const filteredByRestaurant = records.filter(r => {
    const mealType = getMealTypeById(r.mealTypeId);

    return mealType?.restaurantId === restaurantId;
  })

  if (!mealTypeId) {
    return filteredByRestaurant;
  }

  const filteredByMealType = filteredByRestaurant.filter(r => r.mealTypeId === mealTypeId);

  return filteredByMealType;
}

export function getMealRecordById(id: string): MealRecord | null{
  return getStorage().data.records.find(r => r.id === id) || null;
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
  // console.log(records);

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

  // console.log(x, y);

  if (x?.length <= 0 || y?.length <= 0 || xy?.length <= 0) {
    return {
      a: 0, 
      b: 0, 
      avgJVB: 0}
  }

  const sumXY = xy.reduce((a, v) => a+v);
  const sumX = x.reduce((a, v) => a+v);
  const sumX2 = x2.reduce((a, v) => a+v);
  const sumY = y.reduce((a, v) => a+v);
  const avgJVB = jvbs.reduce((a, v) => a+v) / jvbs.length;

  // console.log(x, sumX);

  // calculate y=mx+b for bolus
  const b = (x.length*sumXY - sumX*sumY)/(x.length*sumX2 - sumX*sumX) || 0;
  const a = (sumY - b*sumX)/x.length;

  return {a, b, avgJVB};
}

export function planNotificationForMeal(recordId: string, secondsFromNow: number = 2 * 60 * 60) {
  const record = getMealRecordById(recordId);

  if (!record) {
    console.error('Failed to get record.')
    return
  }

  const mealType = getMealTypeById(record.mealTypeId)

  if (!mealType) {
    console.error('Failed to get meal type.')
    return
  }

  console.log(record)

  Notification.requestPermission((result) => {
    if (result === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        setTimeout(() => {
          registration.showNotification("Dokončete záznam o jídle", {
            body: `Dokončete prosím záznam o jídle '${mealType.name}'`,
            icon: "../images/touch/chrome-touch-icon-192x192.png",
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            tag: "complete-record",
          });
        }, secondsFromNow * 1000)
      });
    }
  });
}

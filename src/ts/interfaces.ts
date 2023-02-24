export interface Restaurant {
  id: string;
  name: string;
  geoLat: number;
  geoLong: number;
}

export interface MealType {
  id: string;
  restaurantId: string;
  name: string;
}

export interface MealRecord {
  id: string;
  mealTypeId: string;
  init: number;
  dose: number;
  result?: number;
  dateTime: number;
}
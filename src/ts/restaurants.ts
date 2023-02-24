import { calculateBolus } from './bolus';
import { history, type HistoryRecord } from './data';
export let restaurants: any = {};


history.forEach(rec => {
  // push to data structure
  if (!restaurants[rec.Restaurant]) {
    restaurants[rec.Restaurant] = {};
  }
  if (!restaurants[rec.Restaurant][rec.Food]) {
    restaurants[rec.Restaurant][rec.Food] = {
      arr: [],
    };
  }

  restaurants[rec.Restaurant][rec.Food].arr.push(rec);
});

Object.keys(restaurants).forEach(restaurant => {
  Object.keys(restaurants[restaurant]).forEach((food) => {
    calculateBolus(restaurants[restaurant][food]);
  });
});

// console.log(restaurants);
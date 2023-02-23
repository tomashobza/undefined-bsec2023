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
    const x: number[] = [];
    const y: number[] = [];
    const x2: number[] = [];
    const xy: number[] = [];
    const jvbs: number[] = [];

    restaurants[restaurant][food].arr.forEach((foodRecord: HistoryRecord) => {
      x.push(foodRecord.Result-foodRecord.Initial);
      x2.push((foodRecord.Result-foodRecord.Initial)*(foodRecord.Result-foodRecord.Initial));
      y.push(foodRecord.Bolus);
      xy.push((foodRecord.Result-foodRecord.Initial)*foodRecord.Bolus);
      jvbs.push(foodRecord.Bolus+(foodRecord.Result-foodRecord.Initial));
    });

    const sumXY = xy.reduce((a, v) => a+v);
    const sumX = x.reduce((a, v) => a+v);
    const sumX2 = x2.reduce((a, v) => a+v);
    const sumY = y.reduce((a, v) => a+v);
    const avgJVB = jvbs.reduce((a, v) => a+v) / jvbs.length;

    const b = (x.length*sumXY - sumX*sumY)/(x.length*sumX2 - sumX*sumX) || 0;
    const a = (sumY - b*sumX)/x.length;

    console.log(avgJVB, food);

    restaurants[restaurant][food]['a'] = a;
    restaurants[restaurant][food]['b'] = b;
    restaurants[restaurant][food]['avgJVB'] = avgJVB;
  });
});

console.log(restaurants);